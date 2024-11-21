import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useRef } from 'react';


export default function Primeiro_acesso() {
    const [ra, setRa] = React.useState<string>('');
    const [nome, setNome] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [confEmail, setConfEmail] = React.useState<string>('');
    const [senha, setSenha] = React.useState<string>('');

    const inputNameRef = useRef<TextInput>(null)
    const inputEmailRef = useRef<TextInput>(null)
    const inputConfEmailRef = useRef<TextInput>(null)
    const inputPasswdRef = useRef<TextInput>(null)

    const validarFormulario = (): boolean => {
        if (!ra || !nome || !email || !confEmail || !senha) {
            Alert.alert("Erro", "Preencha todos os campos.");
            return false;
        }
        if (email !== confEmail) {
            Alert.alert("Erro", "Os e-mails não coincidem.");
            return false;
        }
        if (senha.length < 6) {
            Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres.");
            return false;
        }
        return true;
    };
    

    // Lista de RAs autorizados
    const rasAutorizados:{[key: string]: boolean} = {
        '0381424': true,
        '234567': true,
        '345678': true,
        '456789': true,
        '567890': true
    };

    // Função para validar se o RA está autorizado
    const validarRA = (ra: string): boolean => {
        return rasAutorizados[ra] !== undefined;
    };

    // Função para verificar RA antes de prosseguir com cadastro
    const verificarRA = () => {
        if (!validarRA(ra)) {
            Alert.alert(
                "RA não autorizado",
                "Desculpe, este RA não está autorizado para cadastro. Entre em contato com o administrador.",
                [{ text: "OK" }],
                { cancelable: false }
            );
            return false;
        }
        return true;
    };
    const handleOnSubmit = async () => {
        if (!validarFormulario() || !verificarRA()) {
            return;
        }5
        const apiUrl = 'https://api-cotapreco.onrender.com/users'; // Substitua com o seu endpoint da API, não use localhost, coloque o ip da sua maquina para funcionar em emuladores e devices.
        const userData = {
            ra: ra,
            nome: nome,
            email: email,
            senha: senha
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log('Dados enviados com sucesso:', jsonResponse);
                // Resetar os estados
                setRa('');
                setNome('');
                setEmail('');
                setConfEmail('');
                setSenha('');

                Alert.alert(
                    "Cadastro Solicitado",
                    "Seu cadastro foi solicitado com sucesso!",
                    [
                      { text: "OK" }
                    ],
                    { cancelable: false }
                  );
            } else {
                throw new Error('Falha ao enviar dados');
            }
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };


    return (
        <KeyboardAvoidingView style={styles.container}>

            <Text style={styles.title}>
                Somente Alunos e Professores
            </Text>
            <View style={styles.wraperInput}>
                <TextInput style={styles.input} onChangeText={setRa} value={ra} keyboardType='numeric' placeholder='RA' returnKeyType='next' onSubmitEditing={() => inputNameRef.current?.focus()} />

                <TextInput style={styles.input} onChangeText={setNome} value={nome} placeholder='Nome' returnKeyType='next' onSubmitEditing={() => inputEmailRef.current?.focus()} ref={inputNameRef}/>

                <TextInput style={styles.input} onChangeText={setEmail} value={email} keyboardType='email-address' placeholder='E-mail' returnKeyType='next' onSubmitEditing={() => inputConfEmailRef.current?.focus()} ref={inputEmailRef} />

                <TextInput style={styles.input} onChangeText={setConfEmail} value={confEmail} keyboardType='email-address' placeholder='Confirmação do E-mail' returnKeyType='next' onSubmitEditing={() => inputPasswdRef.current?.focus()} ref={inputPasswdRef}/>

                <TextInput textContentType='password' onChangeText={setSenha} value={senha} style={styles.input} placeholder='Senha' returnKeyType='done' onSubmitEditing={handleOnSubmit} ref={inputPasswdRef}/>

            </View>

            <TouchableOpacity style={styles.botaoLogin} onPress={handleOnSubmit} activeOpacity={0.7}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }} >Cadastrar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: '100%',
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",

    },
    wraperInput: {
        gap: 24,

    },
    title: {
        fontSize: 18,
        margin: 10,
        color: "#ccc",
        textAlign: 'justify',

    },
    input: {
        width: 357,
        height: 64,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#f0f8ff"
    },
    image: {
        marginTop: 70,
        width: 300,
        height: 70,
    },
    botaoLogin: {
        borderRadius: 5,
        width: 260,
        height: 60,
        backgroundColor: "#1e90ff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,


    },

})