from rest_framework import serializers
from django.utils.text import slugify
from django.db import transaction

from .models import Category, Product, Brand, ProductVariant, Color, Size

class CategoryCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category

        fields = [
            "id",
            "name",
            "slug",
            "parent",
        ]

        read_only_fields = [
            "id",
            "slug"
        ]

    def validate_name(self,value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Le nom de la catégorie est obligatoire."
            )

        return value

    def validate(self, attrs):
        name = attrs["name"]
        parent = attrs.get('parent')

        queryset = Category.objects.filter(
            name__iexact=name,
            parent=parent
        )

        if queryset.exists():
            raise serializers.ValidationError({
                "name":"Cette catégorie existe deja à ce niveau"
            })

        return attrs

    def create(self, validated_data):
        name = validated_data["name"]
        base_slug = slugify(name)
        slug = base_slug
        counter = 2
        while Category.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        validated_data["slug"] = slug
        return super().create(validated_data)

class CategoryListSerializer(serializers.ModelSerializer):

    parent_name = serializers.CharField(
        source="parent.name",
        read_only=True
    )

    class Meta:
        model = Category
        fields = [
            "id",
            "name",
            "slug",
            "parent",
            "parent_name",
        ]

class ProductListSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "brand",
            "product_name",
            'description'
        ]

class CategoryUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            "name",
            "parent",
        ]

    def validate_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Le nom de la catégorie est obligatoire."
            )

        return value

    def validate(self, attrs):
        instance = self.instance

        name = attrs.get("name", instance.name)
        parent = attrs.get("parent", instance.parent)

        queryset = Category.objects.filter(
            name__iexact=name,
            parent=parent,
        ).exclude(pk=instance.pk)

        if queryset.exists():
            raise serializers.ValidationError({
                "name": "Cette catégorie existe déjà à ce niveau."
            })

        if parent and parent.pk == instance.pk:
            raise serializers.ValidationError({
                "parent": "Une catégorie ne peut pas être son propre parent."
            })

        return attrs

    def update(self, instance, validated_data):
        old_name = instance.name

        instance.name = validated_data.get(
            "name",
            instance.name,
        )

        instance.parent = validated_data.get(
            "parent",
            instance.parent,
        )

        if instance.name != old_name:
            instance.slug = slugify(instance.name)

        instance.save()

        return instance


class ProductVariantCreateSerializer(serializers.ModelSerializer):
    color = serializers.PrimaryKeyRelatedField(
        queryset=Color.objects.all(),
        required=False,
        allow_null=True,
    )

    size = serializers.PrimaryKeyRelatedField(
        queryset=Size.objects.all(),
        required=False,
        allow_null=True,
    )

    class Meta:
        model = ProductVariant
        fields = [
            "id",
            "color",
            "size",
            "name",
            "sku",
            "price",
            "stock",
            "image_url",
        ]

        read_only_fields = [
            "id",
        ]

    def validate_sku(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Le SKU est obligatoire."
            )

        return value

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError(
                "Le prix ne peut pas être négatif."
            )

        return value

    def validate_name(self, value):
        return value.strip()

class ProductCreateSerializer(serializers.ModelSerializer):

    brand = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        required=False,
        allow_null=True,
    )

    brand_name = serializers.CharField(
        write_only=True,
        required=False,
        allow_blank=True,
    )

    variants = ProductVariantCreateSerializer(
        many=True,
        required=False,
    )

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "brand",
            "brand_name",
            "category",
            "description",
            "variants",
        ]

        read_only_fields = [
            "id",
            "slug",
        ]

    def validate_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Le nom du produit est obligatoire."
            )

        return value

    def validate_variants(self, variants):
        combinations = set()

        for variant in variants:
            color = variant.get("color")
            size = variant.get("size")

            color_id = color.id if color else None
            size_id = size.id if size else None

            combination = (color_id, size_id)

            if combination in combinations:
                raise serializers.ValidationError(
                    "Deux variants ont la même combinaison "
                    "de couleur et de taille."
                )

            combinations.add(combination)

        return variants

    def validate(self, attrs):
        brand = attrs.get("brand")
        brand_name = attrs.get("brand_name")

        if not brand and not brand_name:
            raise serializers.ValidationError({
                "brand": (
                    "Sélectionnez une marque existante "
                    "ou saisissez une nouvelle marque."
                )
            })

        if brand and brand_name:
            raise serializers.ValidationError({
                "brand": (
                    "Choisissez une marque existante "
                    "OU une nouvelle marque."
                )
            })

        if brand:
            name = attrs["name"]

            if Product.objects.filter(
                name__iexact=name,
                brand=brand,
            ).exists():
                raise serializers.ValidationError({
                    "name": (
                        "Ce produit existe déjà pour cette marque."
                    )
                })

        return attrs
