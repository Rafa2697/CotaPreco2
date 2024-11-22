import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function FormEstab({ closeModal }) {
    const [isFocusCidade, setIsFocusCidade] = useState(false);
    const [isFocusCategoria, setIsFocusCategoria] = useState(false);
    const [dadosCidades, setDadosCidades] = useState([]);
    const [valueCidade, setValueCidade] = useState(null);
    const [dadosCategoria, setDadosCategoria] = useState([]);
    const [valueCategoria, setValueCategoria] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        cidade: '',
        endereco: ''
    });

    useEffect(() => {

        // Busca as cidades
        fetch('https://api-cotapreco.onrender.com/cities')
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map(item => ({
                    label: item.nome, // campo 'nome' de cada cidade
                    valueIdCidade: item._id // '_id' de cada cidade
                }));
                setDadosCidades(formattedData);

            })
            .catch(error => console.error(error));
    }, []);
    useEffect(() => {

        // Busca as categorias
        fetch('https://api-cotapreco.onrender.com/category')
            .then(response => response.json())
            .then(data => {
                const formattedData = data.map(item => ({
                    label: item.nome, // campo 'nome' de cada categoria
                    valueIdCategoria: item._id // '_id' de cada categoria
                }));
                setDadosCategoria(formattedData);

            })
            .catch(error => console.error(error));
    }, []);

    const handlePostEstab = async () => {
        try {
            const response = await fetch(`https://api-cotapreco.onrender.com/establishments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Produto atualizado com sucesso!');
            } else {
                alert('Erro ao atualizar produto');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao atualizar produto');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Estabelecimento</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do estabelecimento"
                value={formData.nome}
                onChangeText={(text) => setFormData({ ...formData, nome: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Logradouro"
                value={formData.endereco}
                onChangeText={(text) => setFormData({ ...formData, endereco: text })}
            />

            <View style={styles.containerDropdown}>
                <Dropdown
                    style={[styles.dropdown, isFocusCategoria && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dadosCategoria}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="valueIdCategoria"
                    value={valueCategoria}
                    placeholder={!isFocusCategoria ? 'Selecionar Categoria' : '...'}
                    searchPlaceholder="Search..."
                    onFocus={() => setIsFocusCategoria(true)}
                    onBlur={() => setIsFocusCategoria(false)}
                    onChange={item => {
                        setValueCategoria(item.valueIdCategoria);
                        setFormData({ ...formData, categoria: item.valueIdCategoria });
                        setIsFocusCategoria(true);
                    }}

                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={isFocusCategoria ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
            </View>

            <View style={styles.containerDropdown}>
                <Dropdown
                    style={[styles.dropdown, isFocusCidade && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dadosCidades}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="valueIdCidade"
                    value={valueCidade}
                    placeholder={!isFocusCidade ? 'Selecionar Cidade' : '...'}
                    searchPlaceholder="Search..."
                    onFocus={() => setIsFocusCidade(true)}
                    onBlur={() => setIsFocusCidade(false)}
                    onChange={item => {
                        setValueCidade(item.valueIdCidade);
                        setFormData({ ...formData, cidade: item.valueIdCidade });
                        setIsFocusCidade(true);
                    }}

                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={isFocusCidade ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
            </View>


            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.submitButton]}
                    onPress={handlePostEstab}
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
        marginBottom: 15
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
