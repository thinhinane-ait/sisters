import Image from "next/image";
import Link from "next/link";

const stats = [
  { label: "Catégories", value: "24" },
  { label: "Produits", value: "186" },
  { label: "Variantes", value: "542" },
  { label: "Stock faible", value: "12" },
];

const recentProducts = [
  {
    name: "Robe Satinée",
    category: "Femme > Robes",
    price: "59,99 €",
    stock: 12,
  },
  {
    name: "Basket Luna",
    category: "Femme > Chaussures",
    price: "89,99 €",
    stock: 7,
  },
  {
    name: "Sac Aurora",
    category: "Accessoires > Sacs",
    price: "74,90 €",
    stock: 21,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-72 border-r border-rose-100 bg-white/80 p-6 backdrop-blur lg:block">
          <div className="mb-10 flex items-center gap-3">

            <Image
              src="/logo-sisters_2.jpeg"
              alt="Sisters"
              width={115}
              height={115}
              className="rounded-full"
            />

            <div>
              <p className="font-semibold text-violet-700">Sisters</p>
              <p className="text-xs text-slate-400">Administration</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              href="/"
              className="block rounded-xl bg-gradient-to-r from-rose-100 to-violet-100 px-4 py-3 font-medium text-violet-700"
            >
              Tableau de bord
            </Link>

            <Link
              href="/categories"
              className="block rounded-xl px-4 py-3 text-slate-600 transition hover:bg-rose-50 hover:text-violet-700"
            >
              Catégories
            </Link>

            <Link
              href="/products"
              className="block rounded-xl px-4 py-3 text-slate-600 transition hover:bg-rose-50 hover:text-violet-700"
            >
              Produits
            </Link>

            <Link
              href="/brands"
              className="block rounded-xl px-4 py-3 text-slate-600 transition hover:bg-rose-50 hover:text-violet-700"
            >
              Marques
            </Link>

            <Link
              href="/orders"
              className="block rounded-xl px-4 py-3 text-slate-600 transition hover:bg-rose-50 hover:text-violet-700"
            >
              Commandes
            </Link>

            <Link
              href="/clients"
              className="block rounded-xl px-4 py-3 text-slate-600 transition hover:bg-rose-50 hover:text-violet-700"
            >
              Clients
            </Link>
            <Link
              href="/users"
              className="block rounded-xl px-4 py-3 text-slate-600 transition hover:bg-rose-50 hover:text-violet-700"
            >
              Utilisateurs
            </Link>
            <Link
              href="/colors"
              className="block rounded-xl px-4 py-3 text-slate-600 transition hover:bg-rose-50 hover:text-violet-700"
            >
              Couleurs
            </Link>
          </nav>
        </aside>

        {/* CONTENT */}
        <section className="flex-1 p-6 md:p-10">
          <header className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-violet-500">
                Sisters Admin
              </p>

              <h1 className="mt-2 text-4xl font-bold text-slate-900">
                Tableau de bord
              </h1>

              <p className="mt-2 text-slate-500">
                Vue d’ensemble de votre catalogue e-commerce.
              </p>
            </div>

            <button className="rounded-xl bg-gradient-to-r from-violet-600 to-rose-500 px-5 py-3 font-medium text-white shadow-lg shadow-violet-200 transition hover:scale-[1.02]">
             
              <Link href="/products">
                + Ajouter un produit
              </Link>

            </button>
          </header>

          {/* STATS */}
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm"
              >
                <p className="text-sm text-slate-500">{stat.label}</p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            ))}
          </section>

          {/* MAIN GRID */}
          <section className="mt-8 grid gap-6 xl:grid-cols-3">
            {/* PRODUCTS */}
            <div className="xl:col-span-2 rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Produits récents
                  </h2>

                  <p className="text-sm text-slate-400">
                    Derniers produits ajoutés
                  </p>
                </div>

                <button className="text-sm font-semibold text-violet-600">
                  Voir tout
                </button>
              </div>

              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div
                    key={product.name}
                    className="flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {product.name}
                      </p>

                      <p className="text-sm text-slate-400">
                        {product.category}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <span className="font-medium text-slate-700">
                        {product.price}
                      </span>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                        Stock {product.stock}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="rounded-3xl bg-gradient-to-br from-violet-700 via-fuchsia-600 to-rose-500 p-6 text-white shadow-xl">
              <p className="text-sm uppercase tracking-[0.2em] text-rose-100">
                Actions rapides
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Gérer Sisters
              </h2>

              <div className="mt-6 space-y-3">
                <Link
                  href="/categories"
                  className="block rounded-xl bg-white/15 px-4 py-3 backdrop-blur transition hover:bg-white/25"
                >
                  Ajouter une catégorie
                </Link>

                <Link
                  href="/products"
                  className="block rounded-xl bg-white/15 px-4 py-3 backdrop-blur transition hover:bg-white/25"
                >
                  Ajouter un produit
                </Link>

                <Link
                  href="/brands"
                  className="block rounded-xl bg-white/15 px-4 py-3 backdrop-blur transition hover:bg-white/25"
                >
                  Ajouter une marque
                </Link>
              </div>
            </div>
          </section>

          {/* BOTTOM */}
          <section className="mt-8 rounded-3xl border border-violet-100 bg-white/80 p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-rose-400">
              Sisters
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Une administration pensée pour évoluer
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-500">
              Cette maquette accueillera progressivement les catégories,
              produits, variantes, promotions, commandes, utilisateurs,
              statistiques et outils de gestion du catalogue.
            </p>
          </section>
        </section>
      </div>
    </main>
  );
}