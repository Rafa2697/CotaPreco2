import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react';
export default function FormCidade({ closeModal }) {
    const [formData, setFormData] = useState({
        nome: '',
        estado: '',
        pais: ''
    });

    const handlePostCity = async () => {
        try {
            const response = await fetch(`https://api-cotapreco.onrender.com/cities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Cidade Cadastrada com sucesso!');
            } else {
                alert('Erro ao cadastrar cidade');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao atualizar produto');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Cidade</Text>
            
            <TextInput 
                style={styles.input}
                placeholder="Nome da cidade"
                value={formData.nome}
                onChangeText={(text) => setFormData({ ...formData, nome: text })} // Atualiza o estado do nome
            />
            
            <TextInput 
                style={styles.input}
                placeholder="Estado"
                value={formData.estado}
                onChangeText={(text) => setFormData({ ...formData, estado: text })}
            />

            <TextInput
                style={styles.input}
                placeholder='Pais'
                value={formData.pais}
                onChangeText={(text) => setFormData({ ...formData, pais: text })}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, styles.submitButton]}
                    onPress={handlePostCity}
                >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]}
                    onPress={closeModal}
                >
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        marginBottom: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    button: {
        padding: 15,
        borderRadius: 8,
        width: '48%',
        alignItems: 'center'
    },
    submitButton: {
        backgroundColor: '#2196F3'
    },
    cancelButton: {
        backgroundColor: '#FF5252'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
