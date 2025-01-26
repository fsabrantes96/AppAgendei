import React, { useContext, useEffect } from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";

import { AuthContext } from "../../context/auth.js"; // Importar o contexto
import icon from "../../constants/icon";

import AbaHome from "../abahome/abahome";
import AbaCalendar from "../abacalendar/abacalendar";
import AbaProfile from "../abaProfile/abaprofile";
import AbaCadastroCliente from "../abaCadastroCliente/abaCadastroCliente";

const Tab = createBottomTabNavigator();

function Main() {
    const { loadClientes } = useContext(AuthContext); // Função para carregar clientes do contexto
    const isFocused = useIsFocused(); // Detecta se a tela está ativa

    // Recarrega os clientes quando a tela ganha foco
    useEffect(() => {
        if (isFocused) {
            loadClientes(); // Recarregar os dados de clientes
        }
    }, [isFocused, loadClientes]); // Certifique-se de incluir loadClientes na lista de dependências

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={AbaHome}
                options={{
                    headerTitleAlign: "center",
                    headerTitle: () => (
                        <Image
                            source={icon.logoHome}
                            style={{ width: 250, height: 150 }}
                        />
                    ),
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icon.home}
                            style={{
                                width: 30,
                                height: 30,
                                opacity: focused ? 1 : 0.3,
                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Calendar"
                component={AbaCalendar}
                options={{
                    headerTitleAlign: "center",
                    headerTitle: () => (
                        <Image
                            source={icon.logoHome}
                            style={{ width: 250, height: 150 }}
                        />
                    ),
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icon.calendar}
                            style={{
                                width: 30,
                                height: 30,
                                opacity: focused ? 1 : 0.3,
                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="NovoCliente"
                component={AbaCadastroCliente}
                options={{
                    headerTitleAlign: "center",
                    headerTitle: () => (
                        <Image
                            source={icon.logoHome}
                            style={{ width: 250, height: 150 }}
                        />
                    ),
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icon.addPerson}
                            style={{
                                width: 30,
                                height: 30,
                                opacity: focused ? 1 : 0.3,
                            }}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={AbaProfile}
                options={{
                    headerTitleAlign: "center",
                    headerTitle: () => (
                        <Image
                            source={icon.logoHome}
                            style={{ width: 250, height: 150 }}
                        />
                    ),
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => (
                        <Image
                            source={icon.profile}
                            style={{
                                width: 30,
                                height: 30,
                                opacity: focused ? 1 : 0.3,
                            }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default Main;
