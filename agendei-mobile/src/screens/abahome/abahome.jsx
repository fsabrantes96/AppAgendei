import React, { useContext, useState, useEffect } from "react";
import { Alert, FlatList, Text, View, TextInput,TouchableOpacity } from "react-native";
import { styles } from "./abahome.style";
import Cliente from "../../components/cliente/cliente.jsx";
import { AuthContext } from "../../context/auth.js";

function AbaHome(props) {
    const { clientes } = useContext(AuthContext); // Certifique-se de que o contexto está sendo usado corretamente
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setFilteredClientes(clientes); // Atualiza a lista filtrada quando a lista global muda
    }, [clientes]);

    useEffect(() => {
        if (searchText === "") {
            setFilteredClientes(clientes);
        } else {
            const filtered = clientes.filter(cliente =>
                cliente.nome.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredClientes(filtered);
        }
    }, [searchText, clientes]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Agende seu cliente</Text>
            <TextInput
                style={styles.pesquisa}
                placeholder="Pesquisar nome"
                value={searchText}
                onChangeText={setSearchText}
            />
            <Text style={styles.text}>Clientes</Text>

            <FlatList
                data={filteredClientes}
                keyExtractor={doc => doc.idCliente.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Cliente
                        idCliente={item.idCliente}
                        nome={item.nome}
                        email={item.email}
                        telefone={item.telefone}
                        cpf={item.cpf}
                        anamnese={item.anamnese}
                        dataNascimento={item.dataNascimento}
                        procedimentosAnteriores={item.procedimentosAnteriores}
                        icone={item.icone}
                        onPress={() => props.navigation.navigate("services",{
                            idCliente: item.idCliente,
                            nome: item.nome,
                            dataNascimento: item.dataNascimento,
                            iconCliente: item.icone
                        })}
                    />
                )}
            />
        </View>
    );
}

export default AbaHome;
