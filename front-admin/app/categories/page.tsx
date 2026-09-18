"use client";

import { useEffect, useState } from "react";
import { getCategories,createCategory } from "@/services/categoryService";
import type { Category } from "@/types/category";
import { buildCategoryTree } from "@/utils/categoryTree";
import CategoryRow from "@/components/categories/CategoryRow";
import CategoryForm from "@/components/categories/CategoryForm";
import CategoryTable from "@/components/categories/CategoryTable";

export default function CategoriesPage() {
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const rootCategories = categories.filter(
  (category) => category.parent === null
);
  const loadCategories = async () => {
  try {
    setLoading(true);
    setError(null);

    const data = await getCategories();

    setCategories(data);
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Erreur inconnue"
    );
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
     loadCategories();
  }, []);

  /*
    On transforme les catégories reçues de Django
    en arbre avant de les afficher.
  */
  const categoryTree = buildCategoryTree(categories);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 p-10">
        <p className="text-slate-500">
          Chargement des catégories...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 p-10">
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
          Erreur : {error}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-500">
              Sisters Admin
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Catégories
            </h1>

            <p className="mt-2 text-slate-500">
              Gérez l&apos;arborescence de votre catalogue.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 px-5 py-3 font-medium text-white shadow-lg shadow-violet-100 transition hover:scale-[1.02]"
          >
            + Ajouter une catégorie
          </button>
        </header>
        {/* {showForm && (...)}
        veut dire :
        affiche ce bloc uniquement si showForm vaut true. */}
       {showForm && (
            <CategoryForm
              name={name}
              parent={parent}
              rootCategories={rootCategories}
              onNameChange={setName}
              onParentChange={setParent}
              onClose={() => setShowForm(false)}
              onSubmit={async () => {
                try {
                  await createCategory({
                    name: name,
                     parent: parent ? Number(parent) : null,
                  });

                  setName("");
                  setParent("");
                  setShowForm(false);

                  await loadCategories();
                } catch (error) {
                  console.error(error);
                }
              }}
            />
          )}

        {/* INFORMATIONS */}
        <section className="mb-6 flex flex-wrap gap-4">
          <div className="rounded-2xl border border-violet-100 bg-white px-5 py-4 shadow-sm">
            <p className="text-sm text-slate-400">
              Total
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {categories.length}
            </p>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-white px-5 py-4 shadow-sm">
            <p className="text-sm text-slate-400">
              Catégories principales
            </p>

            <p className="mt-1 text-2xl font-bold text-violet-700">
              {categoryTree.length}
            </p>
          </div>
        </section>

        {/* TABLEAU */}
         <CategoryTable categories={categoryTree} />
      </div>
    </main>
  );
}