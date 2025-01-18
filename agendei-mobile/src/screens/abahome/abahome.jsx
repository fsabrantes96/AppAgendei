import { Alert, FlatList, Text, View, TextInput } from "react-native";
import { styles } from "./abahome.style";
import Cliente from "../../components/cliente/cliente.jsx";
import { useEffect, useState, useContext } from "react";
import api from "../../constants/api.js";
import { AuthContext } from "../../context/auth.js"; // Supondo que você tenha o contexto de autenticação

function AbaHome(props) {
    const [clientes, setClientes] = useState([]); // Lista completa de clientes
    const [filteredClientes, setFilteredClientes] = useState([]); // Lista filtrada de clientes
    const [searchText, setSearchText] = useState(""); // Texto digitado pelo usuário
    const { idUser } = useContext(AuthContext); // Pegando o idUser do contexto de autenticação

    function ClickCliente(
        idCliente,
        nome,
        email,
        telefone,
        cpf,
        anamnese,
        dataNascimento,
        procedimentosAnteriores,
        icone
    ) {
        props.navigation.navigate("services", {
            idCliente,
            idUser,
            nome,
            email,
            telefone,
            cpf,
            anamnese,
            dataNascimento,
            procedimentosAnteriores,
            iconCliente: icone,
        });
    }

    async function LoadClientes() {
        try {
            const response = await api.get("/cliente");

            if (response.data) {
                setClientes(response.data);
                setFilteredClientes(response.data); // Inicializa a lista filtrada com todos os clientes
            }
        } catch (error) {
            if (error.response && error.response.data.error) {
                Alert.alert(error.response.data.error);
            } else {
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde");
            }
        }
    }

    useEffect(() => {
        LoadClientes();
    }, []);

    // Função para filtrar clientes conforme o texto digitado
    useEffect(() => {
        if (searchText === "") {
            setFilteredClientes(clientes); // Se o texto de busca estiver vazio, exibe todos os clientes
        } else {
            const filtered = clientes.filter((cliente) =>
                cliente.nome.toLowerCase().includes(searchText.toLowerCase()) // Filtra ignorando maiúsculas/minúsculas
            );
            setFilteredClientes(filtered);
        }
    }, [searchText, clientes]); // Atualiza a lista filtrada ao alterar o texto ou a lista de clientes

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Agende seu cliente</Text>
            <TextInput
                style={styles.pesquisa}
                placeholder="Pesquisar nome"
                value={searchText} // Valor controlado pelo estado
                onChangeText={setSearchText} // Atualiza o texto de busca
            />
            <Text style={styles.text}>Clientes</Text>

            <FlatList
                data={filteredClientes} // Renderiza a lista filtrada
                keyExtractor={(doc) => doc.idCliente.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <Cliente
                            idCliente={item.idCliente}
                            nome={item.nome}
                            email={item.email}
                            telefone={item.telefone}
                            cpf={item.cpf}
                            anamnese={item.anamnese}
                            dataNascimento={item.dataNascimento}
                            procedimentosAnteriores={item.procedimentosAnteriores}
                            icone={item.icone} // M ou F
                            onPress={() =>
                                ClickCliente(
                                    item.idCliente,
                                    item.nome,
                                    item.email,
                                    item.telefone,
                                    item.cpf,
                                    item.anamnese,
                                    item.dataNascimento,
                                    item.procedimentosAnteriores,
                                    item.icone
                                )
                            }
                        />
                    );
                }}
            />
        </View>
    );
}

export default AbaHome;
