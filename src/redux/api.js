import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5050" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createItem = (itemData) => API.post("/item", itemData);
export const getItems = (page) => API.get(`/item?page=${page}`);
export const getItem = (id) => API.get(`/item/${id}`);
export const deleteItem = (id) => API.delete(`/item/${id}`);
export const updateItem = (updatedItemData, id) =>
  API.patch(`/item/${id}`, updatedItemData);
export const getItemsByUser = (userId) => API.get(`/item/userItems/${userId}`);

export const getItemsBySearch = (searchQuery) =>
  API.get(`/item/search?searchQuery=${searchQuery}`);

export const getTagItems = (tag) => API.get(`/item/tag/${tag}`);
export const getRelatedItems = (tags) => API.post(`/item/relatedItems`, tags);
export const likeItem = (id) => API.patch(`/item/like/${id}`);
