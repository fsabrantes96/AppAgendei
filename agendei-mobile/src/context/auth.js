import { createContext, useState, useEffect } from "react";
import api from "../constants/api";

const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [clientes, setClientes] = useState([]);

    // Carregar clientes ao inicializar
    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await api.get("/cliente");
                if (response.data) {
                    setClientes(response.data);
                }
            } catch (error) {
                console.error("Erro ao carregar clientes:", error);
            }
        }
        fetchClientes();
    }, []);

    // Função para adicionar um cliente
    const addCliente = async (novoCliente) => {
        try {
            const response = await api.post("/cliente", novoCliente);
            if (response.data?.idCliente) {
                setClientes((prevClientes) => [...prevClientes, response.data]);
                return response.data;
            }
            throw new Error("Erro ao cadastrar cliente.");
        } catch (error) {
            console.error("Erro ao adicionar cliente:", error);
            throw error;
        }
    };

    // Função para recarregar os clientes
    const loadClientes = async () => {
        try {
            const response = await api.get("/cliente");
            if (response.data) {
                setClientes(response.data);
            }
        } catch (error) {
            console.error("Erro ao carregar clientes:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                clientes,
                setClientes,
                addCliente,
                loadClientes, // Adicionando a função loadClientes
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };