from django.urls import path

from .views import (
    CategoryCreateAPIView,
    CategoryDetailUpdateDeleteAPIView,
    CategoryListAPIView,
    ProductListAPIView,
    ProductCreateAPIView,
    ProductVariantCreateView
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

    path(
        "products/",
        ProductListAPIView.as_view(),
        name="product-list",
        ),

    path(
        "products/create/",
        ProductCreateAPIView.as_view(),
        name="product-create",
        ),
        
    path(
        "products/<int:product_id>/variants/",
        ProductVariantCreateView.as_view(),
        name="product-variant-create",
    ),
]