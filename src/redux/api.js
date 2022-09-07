import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5050" });

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleSignIn = (result) => API.post("/users/googleSignIn", result);

export const createItem = (itemData) => API.post("item", itemData);
