import type { Category } from "@/types/category";
/*
  Transforme la liste plate reçue depuis Django :

  Homme
  Chaussures -> parent Homme
  Baskets -> parent Chaussures

  en arbre :

  Homme
    ↳ Chaussures
        ↳ Baskets
*/
export function buildCategoryTree(
  categories: Category[]
): Category[] {
  const categoryMap = new Map<number, Category>();

  categories.forEach((category) => {
    categoryMap.set(category.id, {
      ...category,
      children: [],
    });
  });

  const roots: Category[] = [];

  categoryMap.forEach((category) => {
    if (category.parent === null) {
      roots.push(category);
    } else {
      const parent = categoryMap.get(category.parent);

      if (parent) {
        parent.children?.push(category);
      }
    }
  });

  return roots;
}