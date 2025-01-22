import { View, Text, FlatList, Alert, Image } from "react-native";
import { styles } from "./services.style.js";
import { useEffect, useState } from "react";
import icon from "../../constants/icon.js"
import api from "../../constants/api.js";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.js";
import Service from "../../components/service/service.jsx"

function Services(props) {
    const { user } = useContext(AuthContext); // Obtém o usuário logado
    const [services, setServices] = useState([]);  // Armazena os serviços no estado
    const {iconCliente, nome, dataNascimento, idCliente} = props.route.params;

    function ClickService(idProcedimento) {
        props.navigation.navigate("schedule", {
            idCliente,
            idProcedimento
        });
    }

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await api.get(`/user/${user.idUser}/services`);
                setServices(response.data);  // Armazena os serviços no estado
            } catch (error) {
                console.error("Erro ao carregar os serviços:", error);
                Alert.alert("Erro ao carregar os serviços.");
            }
        }

        fetchServices();
    }, [user.idUser]);  // Recarrega os serviços quando o idUser muda

    function CalcularIdade(dataNascimento) {
        if (!dataNascimento) return "Data inválida";
    
        // Converter a data para o formato ISO (AAAA-MM-DD)
        const partes = dataNascimento.split("-");
        const dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
    
        const nascimento = new Date(dataFormatada);
        const hoje = new Date();
    
        // Calcular a idade
        let idade = hoje.getFullYear() - nascimento.getFullYear();
    
        // Ajustar caso o aniversário ainda não tenha ocorrido este ano
        const mesAtual = hoje.getMonth();
        const diaAtual = hoje.getDate();
        const mesNascimento = nascimento.getMonth();
        const diaNascimento = nascimento.getDate();
    
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
            idade--;
        }
        return idade;
    }
    

    return (
 

        <View style={styles.container}>
            <View style={styles.banner}>
                <Image source={iconCliente === "M" ? icon.male : icon.female} style={styles.icon}/>
                <Text style={styles.nome}>{nome}</Text>
                <Text style={styles.idade}>{CalcularIdade(dataNascimento)} anos</Text>
            </View>
            {services.length > 0 ? (
                <FlatList
                    data={services}
                    keyExtractor={(service) => service.idProcedimento}
                    renderItem={({ item }) => (
                        <Service
                            nome={item.nome}
                            valor={item.valor}
                            idProcedimento={item.idProcedimento}
                            onPress={() => ClickService(
                                item.idProcedimento,
                            )}/>
                    )}
                />
            ) : (
                <Text>Nenhum serviço encontrado.</Text>
            )}
        </View>
    );
}

export default Services;


