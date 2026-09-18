import type { Category } from "@/types/category";

type CategoryRowProps = {
  category: Category;
  level?: number;
};

export default function CategoryRow({
  category,
  level = 0,
}: CategoryRowProps) {
  const isRoot = level === 0;

  return (
    <>
      <tr
        className={
          isRoot
            ? "border-t border-violet-100 bg-violet-50/60"
            : "border-t border-slate-100 hover:bg-rose-50/40"
        }
      >
        <td className="px-6 py-4 text-sm text-slate-400">
          {category.id}
        </td>

        <td className="px-6 py-4">
          <div
            className="flex items-center"
            style={{
              paddingLeft: `${level * 28}px`,
            }}
          >
            {level > 0 && (
              <span className="mr-3 text-violet-300">
                ↳
              </span>
            )}

            <div className="flex items-center gap-3">
              <span
                className={
                  isRoot
                    ? "font-bold text-violet-800"
                    : "font-medium text-slate-700"
                }
              >
                {category.name}
              </span>

              {isRoot && (
                <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700">
                  Catégorie principale
                </span>
              )}
            </div>
          </div>
        </td>

        <td className="px-6 py-4 text-sm text-slate-500">
          {category.slug}
        </td>

        <td className="px-6 py-4 text-sm text-slate-500">
          {category.parent_name ?? "—"}
        </td>

        <td className="px-6 py-4">
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg border border-violet-200 bg-white px-3 py-2 text-sm font-medium text-violet-700 transition hover:bg-violet-50"
            >
              Modifier
            </button>

            <button
              type="button"
              className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
            >
              Supprimer
            </button>
          </div>
        </td>
      </tr>

      {category.children?.map((child) => (
        <CategoryRow
          key={child.id}
          category={child}
          level={level + 1}
        />
      ))}
    </>
  );
}