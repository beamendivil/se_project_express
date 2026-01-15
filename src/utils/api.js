// Use environment variable for API URL, fallback to backend dev port (3001)
const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Check response and return parsed JSON or throw error
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Error: ${res.status}`));
};

// GET /items - Fetch all clothing items
const getItems = () => fetch(`${baseUrl}/items`).then(checkResponse);

// POST /items - Add a new clothing item
const addItem = ({ name, imageUrl, weather }) => fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkResponse);

// DELETE /items/:id - Remove a clothing item
const deleteItem = (id) => fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);

export { getItems, addItem, deleteItem, checkResponse };
