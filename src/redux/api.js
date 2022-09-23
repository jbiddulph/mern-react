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
export const getItems = () => API.get("/item");
export const getItem = (id) => API.get(`/item/${id}`);
export const getItemsByUser = (userId) => API.get(`/item/userItems/${userId}`);
