import axios from "axios";

const http = axios.create({
    // baseURL : "http://localhost:5000/api",

    baseURL : "https://chidesocials-server.onrender.com/api",
    headers : {
        "Content-type" : "application/json"
    }
});

export default http;
