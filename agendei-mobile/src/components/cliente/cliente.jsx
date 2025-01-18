import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./cliente.style";
import icon from "../../constants/icon.js";

function Cliente(props) {
    return <TouchableOpacity style={styles.cliente} 
    onPress={() => props.onPress(props.idCliente, props.nome, props.email, props.telefone,
        props.cpf, props.anamnese, props.dataNascimento, props.procedimentosAnteriores, props.icone
    )}>
        <Image source={props.icone == "M" ? icon.male : icon.female} style={styles.icon} />
        
            <Text style={styles.name}>{props.nome}</Text>
            
    </TouchableOpacity>
}

export default Cliente;