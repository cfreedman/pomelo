import { BASE_URL } from "@/config/constants";

export interface Store {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export type StoreCreate = Omit<Store, "id">;

export const fetchStoreById = async (id: number): Promise<Store> => {
  const response = await fetch(`${BASE_URL}/stores/${id}`);

  return await response.json();
};

export const fetchAllStores = async (): Promise<Store[]> => {
  const response = await fetch(`${BASE_URL}/stores`);

  return await response.json();
};

export const addStore = async (store: StoreCreate): Promise<Store> => {
  const response = await fetch(`${BASE_URL}/stores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(store),
  });

  return await response.json();
};

export const updateStoreById = async (
  id: number,
  store: StoreCreate
): Promise<Store> => {
  const response = await fetch(`${BASE_URL}/stores/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application.json",
    },
    body: JSON.stringify(store),
  });

  return await response.json();
};

export const deleteStoreById = async (id: number): Promise<void> => {
  await fetch(`${BASE_URL}/stores/${id}`, {
    method: "DELETE",
  });

  return;
};
