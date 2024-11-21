import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';


export default function MenuAluno() {

    return (

        <View style={styles.container}>

            <TouchableOpacity style={styles.viewBox} activeOpacity={0.7} onPress={() => router.push('/categorias')}>
                <AntDesign name="solution1" size={62} color="black" />
                <Text>Produtos cotados</Text>
            </TouchableOpacity >

            <TouchableOpacity style={styles.viewBox} onPress={() => router.push('/cadastros')} activeOpacity={0.7}>
                <AntDesign name="pluscircle" size={62} color="black" />
                <Text>Cadastros</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.viewBox} activeOpacity={0.7}>
                <AntDesign name="exception1" size={64} color="black" />
                <Text>Status Cotação</Text>
            </TouchableOpacity>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    viewBox: {
        borderRadius: 5,
        width: 280,
        height: 120,
        backgroundColor: "#1e90ff",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },
    textBox: {

    }
}

)