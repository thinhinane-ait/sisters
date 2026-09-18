import type { Category } from "@/types/category";

type CategoryFormProps = {
  name: string;
  parent: string;
  rootCategories: Category[];

  onNameChange: (value: string) => void;
  onParentChange: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

export default function CategoryForm({
  name,
  parent,
  rootCategories,
  onNameChange,
  onParentChange,
  onSubmit,
  onClose,
}: CategoryFormProps) {
  return (
    <section className="mb-8 rounded-3xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          Ajouter une catégorie
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="text-sm font-medium text-slate-500 hover:text-slate-800"
        >
          Fermer
        </button>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Nom de la catégorie
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Ex : Chaussures"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
        />
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Catégorie principale
        </label>

        <select
          value={parent}
          onChange={(e) => onParentChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
        >
          <option value="">
            Aucune catégorie principale
          </option>

          {rootCategories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 px-5 py-3 font-medium text-white shadow-lg shadow-violet-100 transition hover:scale-[1.02]"
      >
        Enregistrer
      </button>
    </section>
  );
}