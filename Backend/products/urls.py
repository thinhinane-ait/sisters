from django.urls import path

from .views import (
    CategoryCreateAPIView,
    CategoryDetailUpdateDeleteAPIView,
    CategoryListAPIView,
)

urlpatterns = [
    path(
        "categories/",
        CategoryListAPIView.as_view(),
        name="category-list",
    ),

    path(
        "categories/create/",
        CategoryCreateAPIView.as_view(),
        name="category-create",
    ),

    path(
        "categories/<path:category_path>/",
        CategoryDetailUpdateDeleteAPIView.as_view(),
        name="category-detail",
    ),
]