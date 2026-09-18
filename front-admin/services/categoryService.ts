const API_URL = "http://127.0.0.1:8000/api";

export async function getCategories() {
  const response = await fetch(
    `${API_URL}/categories/`
  );

  if (!response.ok) {
    throw new Error(
      `Impossible de charger les catégories (${response.status})`
    );
  }

  return response.json();
}


/// api creation d'une categories
export async function createCategory(
  data: {
    name: string;
    parent: number | null;
  }
){
  const response = await fetch(
    `${API_URL}/categories/create/`,
    {
       method: "POST",
       headers: {
        "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    throw new Error("Impossible de créer la catégorie");
  }
  return response.json();
}

