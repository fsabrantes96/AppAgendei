// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://192.168.0.104:3001"
// });
// export default api;

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";  // Importando AsyncStorage

const api = axios.create({
    baseURL: "http://192.168.0.104:3001"
});

// Adicionar token ao cabeçalho de todas as requisições
api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.error("Erro ao acessar o token:", error);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export default api;

