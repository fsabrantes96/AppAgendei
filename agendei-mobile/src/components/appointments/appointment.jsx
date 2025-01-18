import { Image, Text, View } from "react-native";
import { styles } from "./appointment.style";
import icon from "../../constants/icon.js";
import Button from "../../components/button/button.jsx"

function Appointment(props) {

    const dt = new Date(props.data + "T" + props.horario);

    return <View style={styles.appointment}>
        <Text style={styles.name}>
            {props.nome_cliente} - {props.nome_procedimento}
        </Text>
        <Text style={styles.nomeDoutor}>{props.nomeDoutor}</Text>

        <View style={styles.container}>
        
            <View style={styles.containerBooking}>
                <View style={styles.booking}>
                    <Image style={styles.icon} 
                    source={icon.calendar} />
                    <Text style={styles.bookingDate}>
                        {dt.toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.booking}>
                    <Image style={styles.icon} 
                    source={icon.clock} />
                    <Text style={styles.bookingHour}>
                        {props.horario}h
                    </Text>
                </View>
            </View>
            
            <View style={styles.containerButton}>
                <Button text="Cancelar Reserva" theme="danger"
                onPress={() => props.onPress(props.idAppointment)}/>
            </View>

        </View>

    </View>
}

export default Appointment;