from django.db import models
from django.utils.text import slugify
from django.db.models import Q

class Brand(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100)

    slug = models.SlugField(
        max_length=120,
        blank=True,
    )

    parent = models.ForeignKey(
        "self",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="children",
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["parent", "slug"],
                name="unique_category_slug_per_parent",
            ),
            models.UniqueConstraint(
                fields=["slug"],
                condition=Q(parent__isnull=True),
                name="unique_root_category_slug",
            ),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Product(models.Model):
    brand = models.ForeignKey(
        Brand,
        on_delete=models.PROTECT,
        related_name="products",
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="products",
    )

    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=180, unique=True, blank=True)
    description = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Color(models.Model):
    name = models.CharField(max_length=50, unique=True)
    hex_code = models.CharField(
        max_length=7,
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.name


class Size(models.Model):
    value = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.value


class ProductVariant(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="variants",
    )
    color = models.ForeignKey(
        Color,
        on_delete=models.PROTECT,
        related_name="variants",
        null=True,
        blank=True,
    )
    size = models.ForeignKey(
        Size,
        on_delete=models.PROTECT,
        related_name="variants",
        null=True,
        blank=True,
    )

    name = models.CharField(
        max_length=100,
        blank=True,
    )
    sku = models.CharField(
        max_length=64,
        unique=True,
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )
    stock = models.PositiveIntegerField(default=0)
    image_url = models.URLField(
        max_length=255,
        blank=True,
        null=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["product", "color", "size"],
                name="unique_product_color_size",
            )
        ]

    def __str__(self):
        parts = [self.product.name]

        if self.color:
            parts.append(self.color.name)

        if self.size:
            parts.append(self.size.value)

        return " - ".join(parts)


class MeasurementType(models.Model):
    name = models.CharField(max_length=50)
    unit = models.CharField(max_length=20)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "unit"],
                name="unique_measurement_name_unit",
            )
        ]

    def __str__(self):
        return f"{self.name} ({self.unit})"


class VariantMeasurement(models.Model):
    variant = models.ForeignKey(
        ProductVariant,
        on_delete=models.CASCADE,
        related_name="measurements",
    )
    measurement_type = models.ForeignKey(
        MeasurementType,
        on_delete=models.PROTECT,
        related_name="variant_measurements",
    )
    value = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["variant", "measurement_type"],
                name="unique_variant_measurement",
            )
        ]

    def __str__(self):
        return (
            f"{self.variant} - "
            f"{self.measurement_type.name}: "
            f"{self.value} {self.measurement_type.unit}"
        )
