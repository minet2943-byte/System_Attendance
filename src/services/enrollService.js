import axios from "axios";

const API = axios.create({

    baseURL:"http://localhost:8080/api"

});

const createEnroll = (data)=>{

    return API.post("/enroll", data);

};

export default {

    createEnroll

};