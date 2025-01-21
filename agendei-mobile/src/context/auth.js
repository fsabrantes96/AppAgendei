// // import { createContext, useState } from "react";

// // const AuthContext = createContext({});

// // function AuthProvider(props) {

// //     const [user, setUser] = useState({});

// //     return <AuthContext.Provider value={{ user, setUser }}>
// //         {props.children}
// //     </AuthContext.Provider>
// // }

// // export { AuthProvider, AuthContext }

// import { createContext, useState, useEffect } from "react";
// import api from "../constants/api"; // Certifique-se de que o caminho está correto.

// const AuthContext = createContext({});

// function AuthProvider(props) {
//     const [user, setUser] = useState({
//         clientes: [],
//     });

//     // Carregar clientes ao inicializar
//     useEffect(() => {
//         async function fetchClientes() {
//             try {
//                 const response = await api.get("/cliente");
//                 if (response.data) {
//                     setClientes(response.data);
//                 }
//             } catch (error) {
//                 console.error("Erro ao carregar clientes:", error);
//             }
//         }
//         fetchClientes();
//     }, []);

//     // Adicionar novo cliente e atualizar a lista global
//     const addCliente = async (novoCliente) => {
//         try {
//             const response = await api.post("/cliente", novoCliente);
//             if (response.data?.idCliente) {
//                 setClientes((prevClientes) => [...prevClientes, response.data]);
//                 return response.data;
//             }
//             throw new Error("Erro ao cadastrar cliente.");
//         } catch (error) {
//             console.error("Erro ao adicionar cliente:", error);
//             throw error;
//         }
//     };

//     // Atualizar informações de um cliente existente
//     const updateCliente = async (idCliente, clienteAtualizado) => {
//         try {
//             const response = await api.put(`/cliente/${idCliente}`, clienteAtualizado);
//             if (response.data) {
//                 setClientes((prevClientes) =>
//                     prevClientes.map((cliente) =>
//                         cliente.idCliente === idCliente ? response.data : cliente
//                     )
//                 );
//                 return response.data;
//             }
//             throw new Error("Erro ao atualizar cliente.");
//         } catch (error) {
//             console.error("Erro ao atualizar cliente:", error);
//             throw error;
//         }
//     };

//     // Remover cliente da lista global
//     const deleteCliente = async (idCliente) => {
//         try {
//             await api.delete(`/cliente/${idCliente}`);
//             setClientes((prevClientes) =>
//                 prevClientes.filter((cliente) => cliente.idCliente !== idCliente)
//             );
//         } catch (error) {
//             console.error("Erro ao remover cliente:", error);
//             throw error;
//         }
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 setUser,
//                 clientes,
//                 setClientes,
//                 addCliente,
//                 updateCliente,
//                 deleteCliente,
//             }}
//         >
//             {props.children}
//         </AuthContext.Provider>
//     );
// }

// export { AuthProvider, AuthContext };

import { createContext, useState, useEffect } from "react";
import api from "../constants/api"; // Certifique-se de que o caminho está correto.

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

    // Adicionar novo cliente
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

    // Atualizar cliente
    const updateCliente = async (idCliente, clienteAtualizado) => {
        try {
            const response = await api.put(`/cliente/${idCliente}`, clienteAtualizado);
            if (response.data) {
                setClientes((prevClientes) =>
                    prevClientes.map((cliente) =>
                        cliente.idCliente === idCliente ? response.data : cliente
                    )
                );
                return response.data;
            }
            throw new Error("Erro ao atualizar cliente.");
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            throw error;
        }
    };

    // Remover cliente
    const deleteCliente = async (idCliente) => {
        try {
            await api.delete(`/cliente/${idCliente}`);
            setClientes((prevClientes) =>
                prevClientes.filter((cliente) => cliente.idCliente !== idCliente)
            );
        } catch (error) {
            console.error("Erro ao remover cliente:", error);
            throw error;
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
                updateCliente,
                deleteCliente,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };
