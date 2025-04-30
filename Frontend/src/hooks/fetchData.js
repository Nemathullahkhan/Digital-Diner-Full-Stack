export const menuItemsData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/menu`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch menu items");
    }
    const data = await response.json();
    return data; // Should return an array of menu items
  } catch (error) {
    throw new Error(error.message);
  }
};
