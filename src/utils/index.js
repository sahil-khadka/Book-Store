import axios from "axios";
const productUrl = "https://www.googleapis.com/books/v1/volumes?q=all";

export const customFetch = axios.create({
  baseURL: productUrl,
});
