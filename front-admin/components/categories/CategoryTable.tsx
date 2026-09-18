import type { Category } from "@/types/category";
import CategoryRow from "@/components/categories/CategoryRow";

type CategoryTableProps = {
  categories: Category[];
};

export default function CategoryTable({
  categories,
}: CategoryTableProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Arborescence des catégories
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Les catégories principales regroupent leurs sous-catégories.
        </p>
      </div>

      {categories.length === 0 ? (
        <div className="p-10 text-center text-slate-400">
          Aucune catégorie disponible.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  ID
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Catégorie
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Slug
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Parent
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}