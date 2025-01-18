import { View, Text } from "react-native";
import { styles } from "./service.style.js"
import Button from "../button/button.jsx"

function Agendamento(props) {
    return <View style={styles.service}>
        <View style={styles.containerText}>
            <Text style={styles.procedimento}>{props.nome}</Text>
            <Text style={styles.valor}>
                    {
                        new Intl.NumberFormat("pt-BR", {
                            style: "currency", currency: "BRL"
                        }).format(props.valor)
                    }
            </Text>
        </View>

        <View style={styles.containerButton}>
            <Button text="Agendar" onPress={() => props.onPress(props.idProcedimento)}/>
        </View>
    </View>
}

export default Agendamento;