import axios from 'axios';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // or your backend URL
    withCredentials: true, // send cookies by default
});

// Optional: add request/response interceptors for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // e.g., logout user on 401
        if (error.response?.status === 401) {
            // store.dispatch(logout()); // if you want auto-logout
        }
        return Promise.reject(error);
    }
);      
