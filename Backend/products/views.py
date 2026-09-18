from django.shortcuts import get_object_or_404
from django.db.models.deletion import ProtectedError
from rest_framework.response import Response
from rest_framework import status

from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
)

from .models import Category
from .serializers import (
    CategoryCreateSerializer,
    CategoryListSerializer,
    CategoryUpdateSerializer,
)


class CategoryCreateAPIView(CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryCreateSerializer


class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.select_related("parent").order_by("name")
    serializer_class = CategoryListSerializer


class CategoryDetailUpdateDeleteAPIView(RetrieveUpdateDestroyAPIView):

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return CategoryUpdateSerializer

        return CategoryListSerializer

    def get_object(self):
        category_path = self.kwargs["category_path"].strip("/")
        slugs = category_path.split("/")

        parent = None
        category = None

        for slug in slugs:
            category = get_object_or_404(
                Category,
                slug=slug,
                parent=parent,
            )
            parent = category

        return category

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        try:
            instance.delete()

        except ProtectedError:
            children = list(
                instance.children.values_list("name", flat=True)
            )

            return Response(
                {
                    "error": "CATEGORY_HAS_CHILDREN",
                    "message": (
                        "Impossible de supprimer cette catégorie "
                        "car elle contient des sous-catégories."
                    ),
                    "children": children,
                },
                status=status.HTTP_409_CONFLICT,
            )

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )