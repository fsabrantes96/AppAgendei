import React, { useState, useContext } from "react";
import { Alert, Text, TextInput, View, TouchableOpacity, Platform, ScrollView, Keyboard, Modal } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Substituindo o DateTimePicker
import { styles } from "./abaCadastroCliente.style";
import Button from "../../components/button/button";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native'; // Navegação
import { AuthContext } from "../../context/auth.js"; // Importando o contexto

function AbaCadastroCliente() {
    const { addCliente } = useContext(AuthContext); // Pegando a função addCliente do contexto
    const navigation = useNavigation(); // Inicializa a navegação

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");
    const [anamnese, setAnamnese] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [procedimentosAnteriores, setProcedimentosAnteriores] = useState("");
    const [procedimentos, setProcedimentos] = useState([]);
    const [sexo, setSexo] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Estado para controlar a visibilidade do seletor de datas
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProcedureIndex, setEditingProcedureIndex] = useState(null);
    const [editedProcedure, setEditedProcedure] = useState("");

    // Função para formatar o CPF
    const formatCPF = (value) => {
        let formattedValue = value.replace(/\D/g, ""); // Remove tudo que não é dígito
        if (formattedValue.length > 11) {
            formattedValue = formattedValue.slice(0, 11); // Limita a 11 dígitos
        }
        // Aplica a máscara de CPF (XXX.XXX.XXX-XX)
        formattedValue = formattedValue.replace(/(\d{3})(\d)/, "$1.$2");
        formattedValue = formattedValue.replace(/(\d{3})(\d)/, "$1.$2");
        formattedValue = formattedValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        return formattedValue;
    };

    // Função para formatar o telefone
    const formatTelefone = (value) => {
        let formattedValue = value.replace(/\D/g, ""); // Remove tudo que não é dígito
        if (formattedValue.length > 11) {
            formattedValue = formattedValue.slice(0, 11); // Limita a 11 dígitos
        }
        // Aplica a máscara de telefone (XX) XXXXX-XXXX
        if (formattedValue.length > 2) {
            formattedValue = `(${formattedValue.slice(0, 2)}) ${formattedValue.slice(2)}`;
        }
        if (formattedValue.length > 10) {
            formattedValue = `${formattedValue.slice(0, 10)}-${formattedValue.slice(10)}`;
        }
        return formattedValue;
    };

    // Função para validar o email
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar email
        return emailRegex.test(value);
    };

    // Função para validar o CPF
    const validateCPF = (value) => {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Regex para validar CPF formatado
        return cpfRegex.test(value);
    };

    // Função para validar o telefone
    const validateTelefone = (value) => {
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/; // Regex para validar telefone formatado
        return telefoneRegex.test(value);
    };

    // Função para lidar com a mudança de data
    const handleDateChange = (date) => {
        const currentDate = new Date();
        if (date > currentDate) {
            Alert.alert("Erro", "A data de nascimento não pode ser posterior à data atual.");
            return;
        }
        setSelectedDate(date);
        setDataNascimento(formatDate(date));
        hideDatePicker();
    };

    // Função para formatar a data
    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Função para exibir o seletor de datas
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    // Função para ocultar o seletor de datas
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // Função para submeter o formulário
    const HandleSubmit = async () => {
        if (!nome || !email || !telefone || !cpf || !dataNascimento || !sexo) {
            Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // Validações adicionais
        if (!validateEmail(email)) {
            Alert.alert("Erro", "Por favor, insira um email válido.");
            return;
        }
        if (!validateCPF(cpf)) {
            Alert.alert("Erro", "Por favor, insira um CPF válido.");
            return;
        }
        if (!validateTelefone(telefone)) {
            Alert.alert("Erro", "Por favor, insira um telefone válido.");
            return;
        }

        const icone = sexo === "M" ? "M" : "F";

        try {
            const novoCliente = {
                nome,
                email,
                telefone,
                cpf,
                anamnese: anamnese || "",
                dataNascimento: dataNascimento || "",
                procedimentosAnteriores: procedimentos.join(", ") || "",
                sexo,
                icone,
            };

            const cliente = await addCliente(novoCliente);

            if (cliente) {
                Alert.alert("Sucesso", "Cliente cadastrado com sucesso!");
                ClearForm();
                navigation.navigate("main", { reload: true });
            } else {
                Alert.alert("Erro", "Erro ao cadastrar cliente.");
            }
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            Alert.alert("Erro", "Ocorreu um erro. Tente novamente mais tarde.");
        }
    };

    // Função para limpar o formulário
    const ClearForm = () => {
        setNome("");
        setEmail("");
        setTelefone("");
        setCpf("");
        setAnamnese("");
        setDataNascimento("");
        setProcedimentos([]);
        setSexo("");
    };

    // Função para adicionar procedimento
    const addProcedure = () => {
        if (procedimentosAnteriores.trim()) {
            setProcedimentos((prev) => [...prev, procedimentosAnteriores]);
            setProcedimentosAnteriores("");
        }
    };

    // Função para submeter ao pressionar Enter
    const handleSubmitOnEnter = () => {
        addProcedure();
        Keyboard.dismiss();
    };

    // Função para deletar procedimento
    const deleteProcedure = (index) => {
        setProcedimentos((prev) => prev.filter((_, i) => i !== index));
    };

    // Função para abrir o modal de edição
    const openEditModal = (index) => {
        setEditingProcedureIndex(index);
        setEditedProcedure(procedimentos[index]);
        setIsModalVisible(true);
    };

    // Função para salvar o procedimento editado
    const saveEditedProcedure = () => {
        const updatedProcedimentos = [...procedimentos];
        updatedProcedimentos[editingProcedureIndex] = editedProcedure;
        setProcedimentos(updatedProcedimentos);
        setIsModalVisible(false);
        setEditingProcedureIndex(null);
        setEditedProcedure("");
    };

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
                    onBlur={() => {
                        if (!validateEmail(email)) {
                            Alert.alert("Erro", "Por favor, insira um email válido.");
                        }
                    }}
                />
                <TextInput
                    style={styles.input}
                    value={telefone}
                    onChangeText={(value) => setTelefone(formatTelefone(value))}
                    placeholder="Digite o telefone"
                    keyboardType="phone-pad"
                    onBlur={() => {
                        if (!validateTelefone(telefone)) {
                            Alert.alert("Erro", "Por favor, insira um telefone válido.");
                        }
                    }}
                />
                <TextInput
                    style={styles.input}
                    value={cpf}
                    onChangeText={(value) => setCpf(formatCPF(value))}
                    placeholder="Digite o CPF"
                    keyboardType="number-pad"
                    onBlur={() => {
                        if (!validateCPF(cpf)) {
                            Alert.alert("Erro", "Por favor, insira um CPF válido.");
                        }
                    }}
                />
                <TextInput
                    style={styles.input}
                    value={anamnese}
                    onChangeText={setAnamnese}
                    placeholder="Digite a anamnese"
                    multiline
                />
                <Text style={styles.label}>Data de Nascimento</Text>
                <TouchableOpacity onPress={showDatePicker}>
                    <TextInput
                        style={styles.input}
                        value={dataNascimento}
                        placeholder="DD-MM-AAAA"
                        editable={false}
                    />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateChange}
                    onCancel={hideDatePicker}
                    maximumDate={new Date()} // Permite apenas datas até a data atual
                    minimumDate={new Date(1900, 0, 1)} // Permite datas desde 1900
                />
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
                                <TouchableOpacity onPress={() => openEditModal(index)}>
                                    <Text style={styles.actionTextEdit}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteProcedure(index)}>
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