import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import icon from "../../constants/icon.js";
import { styles } from "./account.style";
import { useState } from "react";
import Button from "../../components/button/button";
import api from "../../constants/api.js";


function Account(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function ExecuteAccount() {
        try {
            const response = await api.post("/user/register", {
                name,
                email,
                password
            });

            if (response.data) {
                console.log(response.data);
            }
        }catch (error) {
            if (error.response.data.error)
                Alert.alert(error.response?.data.error);
            else
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde");
        }
    }

    return <View style={styles.container}>

        <View style={styles.containerLogo}>
            <Image source={icon.logo} style={styles.logo} />
        </View>

        <View>
            <Text style={styles.h1Cadastro}>Preencha os campos abaixo</Text>
        </View>

        <View>
            <View style={styles.containerInput}>
                <TextInput placeholder="Nome" style={styles.input}
                onChangeText={(texto) => setName(texto)} />
            </View>

            <View style={styles.containerInput}>
                <TextInput placeholder="E-mail" style={styles.input}
                onChangeText={(texto) => setEmail(texto)}/>
            </View>
            
            <View style={styles.containerInput}>
                <TextInput placeholder="Senha"
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(texto) => setPassword(texto)}/>
            </View>
            <Button text="Criar Conta" onPress={ExecuteAccount}/>
        </View>

        <View style={styles.footer}>
            <Text>Já tenho conta.</Text>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Text style={styles.footerLink}> Fazer Login.</Text>
            </TouchableOpacity>
        </View>

    </View>
}

export default Account;