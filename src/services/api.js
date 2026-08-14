import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
    baseURL: apiBaseUrl,
});


api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    console.log("===== AXIOS REQUEST =====");
    console.log("URL:", config.url);
    console.log("TOKEN:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
        "AUTH HEADER:",
        config.headers.Authorization
    );

    return config;
});


api.getReports = (params)=>{


    return api.get("/attendance/report", {
        params
    });

};


export default api;
