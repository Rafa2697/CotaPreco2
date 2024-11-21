
import { router, Link } from 'expo-router';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';



export default function User() {
    function handleSignup() {
        router.navigate('/login');
    }
    function FistAcess(){
        router.navigate('/primeiro_acesso')
    }
    return (
        <View style={[styles.container]}>

            <Image style={styles.image} source={require("../../../assets/ip_fvr_branco.png")} />
            <Text style={styles.title}>
                O IP-FVR (Índice de preços), foi desenvolvido para os alunos do curso de Ciências Contábeis da UNIVR, fazerem cotações mensais.
            </Text>
            <View style={styles.wraperBotao}>
                <TouchableOpacity style={styles.botaoLogin} onPress={handleSignup} activeOpacity={0.7}>
                    <Text style={{ color: 'white', fontSize: 20 }} >Login</Text>
                </TouchableOpacity >
                <TouchableOpacity style={styles.botaoRegister} onPress={FistAcess} activeOpacity={0.7}>
                    <Text style={{ color: '#1e90ff', fontSize: 20 }}>Cadastro</Text>
                </TouchableOpacity >
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: '100%',
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#25328A",

    },
    wraperBotao: {
        flexDirection: "row",
        gap: 12,

    },
    title: {
        fontSize: 18,
        margin: 10,
        color: "#fff",
        textAlign: 'justify',
    },
    image: {
        marginTop: 70,
        width: 300,
        height: 70,
    },
    botaoLogin: {
        borderRadius: 5,
        width: 160,
        height: 60,
        backgroundColor: "#1e90ff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5
    },
    botaoRegister: {
        borderRadius: 5,
        width: 160,
        height: 60,
        backgroundColor: "#f0f8ff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5
    }

})