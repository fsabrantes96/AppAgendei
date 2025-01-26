import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: "http://192.168.0.104:3001", // Altere o IP para o endereço do backend
});

api.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Erro ao acessar o token:", error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;