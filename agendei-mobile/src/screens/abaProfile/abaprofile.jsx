import { Alert, Text, View } from "react-native";
import {styles} from "./abaprofile.style"
import api from "../../constants/api.js"
import { useContext, useEffect, useState } from "react";
import Button from "../../components/button/button.jsx";
import { AuthContext } from "../../context/auth.js";

function AbaProfile() {

    const {setUser} = useContext(AuthContext);
    const [nomeDoutor, setName] = useState("");
    const[email, setEmail] = useState("");
    const[especialidade, setEspecialidade] = useState("");

    async function LoadProfile() {
        try {
            const response = await api.get("/user/profile");

            if (response.data?.nomeDoutor){
                setName(response.data.nomeDoutor);
                setEmail(response.data.email);
                setEspecialidade(response.data.especialidade);
            }
                

        } catch (error) {
            if (error.response?.data?.error)
                Alert.alert(error.response.data.error);
            else
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde.");
        }
    }

    function Logout() {
        api.defaults.headers.common['Authorization'] = "";
        setUser({});
    }

    useEffect(() => {
        LoadProfile();
    })

    return <View style={styles.container}>
                <View style={styles.containerDados}>
                    <View style={styles.item}>
                        <Text style={styles.title}>Nome</Text>
                        <Text style={styles.text}>{nomeDoutor}</Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.title}>E-mail</Text>
                        <Text style={styles.text}>{email}</Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.title}>Especialidade</Text>
                        <Text style={styles.text}>{especialidade}</Text>
                    </View>
                </View>

            <View style={styles.containerButton}>
                <Button style={styles.botao} text="Desconectar" 
                onPress={Logout}
                /> 
            </View>
    </View>

}

export default AbaProfile;