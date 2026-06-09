import { apiClient } from "./axios";

const STORAGE_KEY = "sofi_gifts";
const SEED_KEY = "sofi_gifts_seeded";

export const MOCK_GIFTS = [
  {
    id: "mock-1",
    name: "Bicicleta de montaña rosa",
    status: "taken",
    createdBy: "seed-user",
    createdAt: "2026-06-01T10:00:00.000Z",
  },
  {
    id: "mock-2",
    name: "Caja Registradora LEGO",
    status: "taken",
    createdBy: "seed-user",
    createdAt: "2026-06-01T10:01:00.000Z",
  },
  {
    id: "mock-3",
    name: "Unicornio de peluche gigante",
    status: "available",
    createdBy: "seed-user",
    createdAt: "2026-06-01T10:02:00.000Z",
  },
  {
    id: "mock-4",
    name: "Kit de ciencias avanzado",
    status: "taken",
    createdBy: "seed-user",
    createdAt: "2026-06-01T10:03:00.000Z",
  },
  {
    id: "mock-5",
    name: "Set de pinturas y pinceles",
    status: "taken",
    createdBy: "seed-user",
    createdAt: "2026-06-01T10:04:00.000Z",
  },
  {
    id: "mock-6",
    name: "Muñeca bebé interactivo",
    status: "taken",
    createdBy: "seed-user",
    createdAt: "2026-06-01T10:05:00.000Z",
  },
];

function getStoredGifts() {
  if (!localStorage.getItem(SEED_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_GIFTS));
    localStorage.setItem(SEED_KEY, "true");
  }
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveGifts(gifts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
}

export async function fetchGifts() {
  try {
    const response = await apiClient.get("/gifts");
    return Array.isArray(response.data) ? response.data : getStoredGifts();
  } catch {
    return getStoredGifts();
  }
}

export async function createGiftApi(giftData) {
  try {
    const response = await apiClient.post("/gifts", giftData);
    return response.data;
  } catch {
    const gifts = getStoredGifts();
    gifts.push(giftData);
    saveGifts(gifts);
    return giftData;
  }
}

export async function deleteGiftApi(id) {
  try {
    await apiClient.delete(`/gifts/${id}`);
  } catch {
    const gifts = getStoredGifts();
    saveGifts(gifts.filter((g) => g.id !== id));
  }
}
