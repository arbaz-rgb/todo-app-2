const API_URL = import.meta.env.VITE_API_URL;

export const addItemToServer = async (task, date) => {
  const response = await fetch(`${API_URL}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, date }),
  });

  if (!response.ok) throw new Error("Failed to add todo Item");
  return response.json();
};

export const getItemsFromServer = async () => {
  const response = await fetch(`${API_URL}/todo`);
  if (!response.ok) throw new Error("Failed to fetch todo items");
  return response.json();
};

export const markItemCompletedOnServer = async (id) => {
  const response = await fetch(`${API_URL}/todo/${id}/completed`, {
    method: "PATCH",
  });

  if (!response.ok) throw new Error("Failed to mark todo completed");
  return await response.json();
};

export const deleteItemFromServer = async (id) => {
  const response = await fetch(`${API_URL}/todo/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete todo item");
  return id;
};
