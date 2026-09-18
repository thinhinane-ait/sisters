from rest_framework import serializers
from django.utils.text import slugify

from .models import Category

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

    def creat(self, validated_data):
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