import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { useState } from 'react'
import FormCidade from '../../../components/forms/FormCidade'

import FormEstab from '../../../components/forms/FormEstab'
import FormProduto from '../../../components/forms/FormProduto'

export default function Cadastro() {
    const [modalCidade, setModalCidade] = useState(false)
    const [modalEstabelecimento, setModalEstabelecimento] = useState(false)
    const [modalProduto, setModalProduto] = useState(false)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastre</Text>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => setModalCidade(true)}
            >
                <Text style={styles.buttonText}>Cadastrar Cidade</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => setModalEstabelecimento(true)}
            >
                <Text style={styles.buttonText}>Cadastrar Estabelecimento</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => setModalProduto(true)}
            >
                <Text style={styles.buttonText}>Cadastrar Produto</Text>
            </TouchableOpacity>

            <Modal visible={modalCidade} animationType="slide">
                <FormCidade closeModal={() => setModalCidade(false)} />
            </Modal>

            <Modal visible={modalEstabelecimento} animationType="slide">
                <FormEstab closeModal={() => setModalEstabelecimento(false)} />
            </Modal>

            <Modal visible={modalProduto} animationType="slide">
                <FormProduto closeModal={() => setModalProduto(false)} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30
    },
    button: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        marginBottom: 15,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})