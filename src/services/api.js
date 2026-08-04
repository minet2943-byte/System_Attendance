import axios from "axios";


const api = axios.create({
    baseURL:"http://localhost:8080/api"
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