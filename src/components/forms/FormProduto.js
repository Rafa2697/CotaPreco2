import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function FormProduto({ closeModal }) {
    const [isFocusEstab, setIsFocusEstab] = useState(false);
    const [dadosEstab, setDadosEstab] = useState([]);
    const [valueEstab, setValueEstab] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        preco: '',
        descricao: '',
        estabelecimento: '',
        
    });
    useEffect(() => {

        fetch('https://api-cotapreco.onrender.com/establishments')
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map(item => ({
                    label: item.nome,
                    value: item._id,
                }));
                setDadosEstab(formattedData)
            })
            .catch(error => console.error(error));
    }, []);

    const handlePostProduct = async () => {
        try {
            const response = await fetch(`https://api-cotapreco.onrender.com/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Produto cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar produto');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro, verifique o log');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Produtos</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do Produto"
                value={formData.nome}
                onChangeText={(text) => setFormData({ ...formData, nome: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Preço"
                value={formData.preco}
                onChangeText={(text) => setFormData({ ...formData, preco: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Descrição"
                value={formData.descricao}
                onChangeText={(text) => setFormData({ ...formData, descricao: text })}
            />
            <View style={styles.containerDropdown}>
                <Dropdown
                    style={[styles.dropdown, isFocusEstab && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dadosEstab}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={valueEstab}
                    placeholder={!isFocusEstab ? 'Selecionar Estabelecimento' : '...'}
                    searchPlaceholder="Search..."
                    onFocus={() => setIsFocusEstab(true)}
                    onBlur={() => setIsFocusEstab(false)}
                    onChange={item => {
                        setValueEstab(item.value);
                        setFormData({ ...formData, estabelecimento: item.value });
                    }}

                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={isFocusEstab ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.submitButton]}
                    onPress={handlePostProduct}
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
    containerDropdown: {
        flex: 1,
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
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '100%',
    },
    placeholderStyle: {
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
})