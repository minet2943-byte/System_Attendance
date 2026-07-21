import axios from "axios";


const api = axios.create({
    baseURL:"http://localhost:8080/api"
});


api.interceptors.request.use((config)=>{

    const token = localStorage.getItem("token");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});


// បន្ថែម API report
api.getReports = (params)=>{

    return api.get("/attendance/report", {
        params
    });

};


export default api;