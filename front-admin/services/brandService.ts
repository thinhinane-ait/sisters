const API_URL = "http://127.0.0.1:8000/api";

export async function getBrands() {
  const response = await fetch(
    `${API_URL}/brands/`
  );

  if (!response.ok) {
    throw new Error(
      `Impossible de charger les marques (${response.status})`
    );
  }

  return response.json();
}

