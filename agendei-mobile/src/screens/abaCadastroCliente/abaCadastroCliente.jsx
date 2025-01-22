import React, { useState } from "react";
import { Alert, Text, TextInput, View, TouchableOpacity, Platform, ScrollView, Keyboard, Modal, } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "./abaCadastroCliente.style";
import Button from "../../components/button/button";
import api from "../../constants/api";
import { Picker } from "@react-native-picker/picker";
import { COLORS, FONT_SIZE } from "../../constants/theme";

function AbaCadastroCliente() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");
    const [anamnese, setAnamnese] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [procedimentosAnteriores, setProcedimentosAnteriores] = useState("");
    const [procedimentos, setProcedimentos] = useState([]);
    const [sexo, setSexo] = useState("");
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProcedureIndex, setEditingProcedureIndex] = useState(null);
    const [editedProcedure, setEditedProcedure] = useState("");

    function handleDateChange(event, date) {
        setShowDatePicker(false);
        if (date) {
            setSelectedDate(date); // Armazena como objeto Date
            setDataNascimento(formatDate(date)); // Formata apenas para exibição
        }
    }
    
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    

    async function HandleSubmit() {
        if (!nome || !email || !telefone || !cpf || !dataNascimento || !sexo) {
            Alert.alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        const icone = sexo === "M" ? "M" : "F"; // Determina o valor do ícone com base no sexo

        try {
            const response = await api.post("/cliente", {
                nome,
                email,
                telefone,
                cpf,
                anamnese: anamnese || "",
                dataNascimento: dataNascimento || "",
                procedimentosAnteriores: procedimentos.join(", ") || "",
                sexo,
                icone, // Adicionado diretamente com base no sexo
            });

            if (response.data?.idCliente) {
                Alert.alert("Cliente cadastrado com sucesso!");
                ClearForm();
            } else {
                Alert.alert("Erro ao cadastrar cliente.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            Alert.alert("Ocorreu um erro. Tente novamente mais tarde.");
        }
    }

    function ClearForm() {
        setNome("");
        setEmail("");
        setTelefone("");
        setCpf("");
        setAnamnese("");
        setDataNascimento("");
        setProcedimentos([]);
        setSexo("");
    }

    function addProcedure() {
        if (procedimentosAnteriores.trim()) {
            setProcedimentos((prev) => [...prev, procedimentosAnteriores]);
            setProcedimentosAnteriores("");
        }
    }

    function handleSubmitOnEnter() {
        addProcedure();
        Keyboard.dismiss();
    }

    function deleteProcedure(index) {
        setProcedimentos((prev) => prev.filter((_, i) => i !== index));
    }

    function openEditModal(index) {
        setEditingProcedureIndex(index);
        setEditedProcedure(procedimentos[index]);
        setIsModalVisible(true);
    }

    function saveEditedProcedure() {
        const updatedProcedimentos = [...procedimentos];
        updatedProcedimentos[editingProcedureIndex] = editedProcedure;
        setProcedimentos(updatedProcedimentos);
        setIsModalVisible(false);
        setEditingProcedureIndex(null);
        setEditedProcedure("");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Cadastrar Cliente</Text>
            <ScrollView contentContainerStyle={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Digite o nome"
                />
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite o email"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    value={telefone}
                    onChangeText={setTelefone}
                    placeholder="Digite o telefone"
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    value={cpf}
                    onChangeText={setCpf}
                    placeholder="Digite o CPF"
                    keyboardType="number-pad"
                />
                <TextInput
                    style={styles.input}
                    value={anamnese}
                    onChangeText={setAnamnese}
                    placeholder="Digite a anamnese"
                    multiline
                />
                <Text style={styles.label}>Data de Nascimento</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        style={styles.input}
                        value={dataNascimento}
                        placeholder="DD-MM-AAAA"
                        editable={false}
                    />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                    style={styles.calendar}
                    value={selectedDate} // Objeto Date válido
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "calendar"}
                    onChange={handleDateChange}
                    maximumDate={new Date()} // Limita até a data atual
                    minimumDate={new Date(1900, 0, 1)} // Permite datas desde 01/01/1900
                />
                )}
                <TextInput
                    style={styles.input}
                    value={procedimentosAnteriores}
                    onChangeText={setProcedimentosAnteriores}
                    placeholder="Procedimentos Anteriores"
                    onSubmitEditing={handleSubmitOnEnter}
                    returnKeyType="done"
                />
                <View style={styles.procedimentosContainer}>
                    {procedimentos.map((procedimento, index) => (
                        <View key={index} style={styles.procedimentoItem}>
                            <Text>{" - " + procedimento}</Text>
                            <View style={styles.procedimentoActions}>
                                
                                <TouchableOpacity
                                    onPress={() => openEditModal(index)}
                                >
                                    <Text style={styles.actionTextEdit}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => deleteProcedure(index)}
                                >
                                    <Text style={styles.actionTextDelete}>Excluir</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
                <Picker
                    selectedValue={sexo}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSexo(itemValue)}
                >
                    <Picker.Item label="Selecione o sexo" value="" />
                    <Picker.Item label="Masculino" value="M" />
                    <Picker.Item label="Feminino" value="F" />
                </Picker>
            </ScrollView>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Editar Procedimento</Text>
                    <TextInput
                        style={styles.input}
                        value={editedProcedure}
                        onChangeText={setEditedProcedure}
                        placeholder="Edite o procedimento"
                    />
                    <View style={styles.modalButtons}>
                        <View style={styles.buttomCancel}>
                            <Button text="Cancelar" theme="light" onPress={() => setIsModalVisible(false)} />
                        </View>
                        <View style={styles.buttomSave}>
                            <Button text="Salvar" theme="success" onPress={saveEditedProcedure} />
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.footerContainer}>
                <Button text="Cadastrar Cliente" theme="danger" onPress={HandleSubmit} />
            </View>
        </View>
    );
}

export default AbaCadastroCliente;
