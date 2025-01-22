import { Alert, Text, View } from "react-native";
import { styles } from "./schedule.style";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { ptBR } from "../../constants/calendar";
import { useEffect, useContext, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import Button from "../../components/button/button";
import { COLORS } from "../../constants/theme";
import { AuthContext } from "../../context/auth.js";
import api from "../../constants/api";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

const horarios = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", 
  "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", 
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", 
  "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", 
  "21:00", "21:30", "22:00"
];

function Schedule(props) {
  const idCliente = props.route.params.idCliente;
  const idProcedimento = props.route.params.idProcedimento;
  const { user } = useContext(AuthContext);
  const idUser = user.idUser;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [occupiedHours, setOccupiedHours] = useState({});

  async function loadOccupiedHours() {
    try {
      const response = await api.get("/appointments");
      if (response.data) {
        const hoursByDate = response.data.reduce((acc, appointment) => {
          const { data, horario } = appointment;
          if (!acc[data]) acc[data] = [];
          acc[data].push(horario);
          return acc;
        }, {});
        setOccupiedHours(hoursByDate);
      }
    } catch (error) {
      Alert.alert("Erro ao carregar agendamentos:", error.message);
    }
  }

  async function ClickBooking() {
    if (!selectedDate || !selectedHour) {
      Alert.alert("Selecione uma data e um horário antes de confirmar.");
      return;
    }

    try {
      const response = await api.post("/appointments", {
        idCliente,
        idProcedimento,
        idUser,
        data: selectedDate,
        horario: selectedHour,
      });

      if (response.data?.idAppointment) {
        props.navigation.popToTop();
        Alert.alert("Reserva agendada!");
      }
    } catch (error) {
      Alert.alert(
        "Erro ao fazer reserva:",
        error.response?.data?.error || "Tente novamente mais tarde."
      );
    }
  }

  useEffect(() => {
    loadOccupiedHours();
  }, []);

  const filterAvailableHours = () => {
    const now = new Date();
    const currentHour = `${String(now.getHours()).padStart(2, "0")}:${String(
      Math.ceil(now.getMinutes() / 30) * 30
    ).padStart(2, "0")}`;

    // Caso seja o dia atual, filtrar horários passados
    if (selectedDate === now.toISOString().split("T")[0]) {
      return horarios.filter(
        (hour) =>
          hour >= currentHour && !(occupiedHours[selectedDate]?.includes(hour))
      );
    }

    // Caso seja outra data, retornar horários disponíveis normalmente
    return horarios.filter((hour) => !(occupiedHours[selectedDate]?.includes(hour)));
  };

  const availableHours = filterAvailableHours();

  return (
    <View style={styles.container}>
      <View>
        <Calendar
          style={styles.theme}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true },
          }}
          minDate={new Date().toISOString().split("T")[0]}
          theme={{
            todayTextColor: COLORS.bordo,
            selectedDayBackgroundColor: COLORS.argila,
            selectedDayTextColor: COLORS.creme,
            arrowColor: COLORS.bordo,
          }}
        />

        <View>
          <Text style={styles.textHour}>Horário</Text>
        </View>

        <View>
          <Picker
            selectedValue={selectedHour}
            onValueChange={(itemValue) => setSelectedHour(itemValue)}
          >
            {availableHours.map((hour, index) => (
              <Picker.Item key={index} label={hour} value={hour} />
            ))}
          </Picker>
        </View>
      </View>

      <View>
        <Button text="Confirmar Reserva" onPress={ClickBooking} />
      </View>
    </View>
  );
}

export default Schedule;
