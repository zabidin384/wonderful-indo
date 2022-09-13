import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({ baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}` });

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
	}
	return req;
});

// Authentication
export const login = (formData) => API.post("/users/login", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
export const googleLogin = (result) => API.post("/users/googleLogin", result);

// Tour
export const createTour = (tourData) => API.post("/tours", tourData);
export const getTours = (page) => API.get(`/tours?page=${page}`);
export const getTour = (id) => API.get(`/tours/${id}`);
export const deleteTour = (id) => API.delete(`/tours/${id}`);
export const updateTour = (updatedTourData, id) => API.patch(`/tours/${id}`, updatedTourData);
export const getToursByUser = (userId) => API.get(`/tours/userTours/${userId}`);

export const getToursBySearch = (searchQuery) => API.get(`/tours/search?searchQuery=${searchQuery}`);
export const getTagTours = (tag) => API.get(`/tours/tag/${tag}`);
export const getRelatedTours = (tags) => API.post(`/tours/relatedTours`, tags);
export const likeTour = (id) => API.patch(`/tours/like/${id}`);
