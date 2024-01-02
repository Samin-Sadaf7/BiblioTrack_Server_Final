import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:4000'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
  
    return req;
  });
  
export const getBooks = (page) => API.get(`/books?page=${page}`);
export const getBooksBySearch = (searchQuery) => API.get(`/books/search?searchQuery=${searchQuery.search || ' '}&genres=${searchQuery.genres}`);
export const addBook = (newBook) => API.post('/books', newBook);
export const buyBook = (id) => API.patch(`/books/${id}/buyBook`);
export const updateBook = (id, updatedBook) => API.patch(`/books/${id}`, updatedBook);
export const deleteBook = (id) => API.delete(`/books/${id}`);
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
export const signInGoogle = (accessToken) => API.post("/users/signinGoogle", {
  googleAccessToken: accessToken
});