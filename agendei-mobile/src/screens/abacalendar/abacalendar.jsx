import React, { useEffect, useState } from "react";  // Importação do React
import { Alert, FlatList, View } from "react-native";
import { styles } from "./abacalendar.style.js";
import Appointment from "../../components/appointments/appointment.jsx";
import { useFocusEffect } from '@react-navigation/native'; // Corrigir importação
import api from "../../constants/api.js";

function AbaCalendar() {
    const [appointments, setAppointments] = useState([]);

    async function LoadAppointments() {
        
        try {
            const response = await api.get("/appointments");
            if (response.data) {
                setAppointments(response.data);
            }
        } catch (error) {

            Alert.alert("Erro ao carregar agendamentos.");
        }
    }

    async function DeleteAppointment(idAppointment) {
        try {
            await api.delete("/appointments/" + idAppointment);
            LoadAppointments();
        } catch (error) {
            if (error.response?.data?.error)
                Alert.alert(error.response.data.error);
            else
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde.");
        }
    }

    useFocusEffect(
        React.useCallback(() => {
            LoadAppointments();
        }, [])
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={appointments}
                keyExtractor={(appoint) => appoint.idAppointment.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <Appointment
                            idAppointment={item.idAppointment}
                            nome_cliente={item.nome_cliente}
                            nome_procedimento={item.nome_procedimento.trim()}
                            nomeDoutor={item.nomeDoutor}
                            data={item.data}
                            horario={item.horario}
                            onPress={DeleteAppointment}
                        />
                    );
                }}
            />
        </View>
    );
}

export default AbaCalendar;
