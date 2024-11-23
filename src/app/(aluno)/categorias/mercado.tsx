import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

interface DropdownItem {
    label: string;
    value: string;
}

interface EstabelecimentoItem {
    label: string;
    value: string;
    ValueId2Cidade: string;
    ValueId2Categoria: string;

}

interface CategoriaItem {
    label: string;
    value: string;

}

interface ProdutoItem {
    label: string;
    value: string;
    ValueId2Estab: string;
}

export default function CategoriaMercado() {
    const [valueCidade, setValueCidade] = useState<string | null>(null);
    const [valueProduto, setValueProduto] = useState<string | null>(null);
    const [valueEstab, setValueEstab] = useState<string | null>(null);
    const [valueCategoria, setValueCategoria] = useState<string | null>(null);

    const [isFocusProduto, setIsFocusProduto] = useState(false);
    const [isFocusCidade, setIsFocusCidade] = useState(false);
    const [isFocusEstab, setIsFocusEstab] = useState(false);
    const [isFocusCategoria, setIsFocusCategoria] = useState(false);
    const [dadosProdutos, setDadosProdutos] = useState<ProdutoItem[]>([]);
    const [dadosCidades, setDadosCidades] = useState<DropdownItem[]>([]);
    const [dadosEstab, setDadosEstab] = useState<EstabelecimentoItem[]>([]);
    const [dadosCategoria, setDadosCategoria] = useState<CategoriaItem[]>([]);
    
    const inputNomeRef = useRef<TextInput>(null)
    const inputPrecoRef = useRef<TextInput>(null)
    const inputDescriRef = useRef<TextInput>(null)

    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        preco: '',
        descricao: ''
    });


    useEffect(() => {

        // Busca as cidades
        fetch('https://api-cotapreco.onrender.com/cities')
            .then(response => response.json())
            .then((data: { nome: string, _id: string }[]) => {
                const formattedData = data.map(item => ({
                    label: item.nome, // campo 'nome' de cada cidade
                    value: item._id // '_id' de cada cidade
                }));
                setDadosCidades(formattedData);

            })
            .catch(error => console.error(error));

        //busca de categorias
        fetch('https://api-cotapreco.onrender.com/category')
            .then(response => response.json())
            .then((data: { nome: string, _id: string }[]) => {
                const formattedData = data.map(item => ({
                    label: item.nome,
                    value: item._id
                }));
                setDadosCategoria(formattedData);
            })
            .catch(error => console.error(error));

        //busca de estabelecimentos
        fetch('https://api-cotapreco.onrender.com/establishments')
            .then(response => response.json())
            .then((data: {
                categoria: any,
                nome: string,
                _id: string,
                cidade: string
            }[]) => {
                const formattedData = data.map(item => ({
                    label: item.nome,
                    value: item._id,
                    ValueId2Cidade: item.cidade,
                    ValueId2Categoria: item.categoria
                }));
                setDadosEstab(formattedData)
            })
            .catch(error => console.error(error));

        //busca de produtos
        fetch('https://api-cotapreco.onrender.com/product')
            .then(response => response.json())
            .then((data: { nome: string, _id: string, preco: number, estabelecimento: string }[]) => {
                // Mapeia os dados para o formato esperado pelo Dropdown
                const formattedData = data.map(item => ({
                    label: `${item.nome} - R$${item.preco ? item.preco.toFixed(2) : '0.00'}`, // Formata o nome e preço como label
                    value: item._id,
                    ValueId2Estab: item.estabelecimento
                }));
                setDadosProdutos(formattedData);
            })
            .catch(error => console.error(error));

    }, []);


    const renderLabelProduto = () => {
        if (valueProduto || isFocusProduto) {
            return (
                <Text style={[styles.label, isFocusProduto && { color: 'blue' }]}>
                    Selecione o Produto
                </Text>

            );
        }
        return null;
    };
    const renderLabelCidade = () => {
        if (valueCidade || isFocusCidade) {
            return (
                <Text style={[styles.label, isFocusCidade && { color: 'blue' }]}>
                    Selecione a Cidade
                </Text>

            );
        }
        return null;
    };
    const renderLabelestabelecimento = () => {
        if (valueEstab || isFocusEstab) {
            return (
                <Text style={[styles.label, isFocusEstab && { color: 'blue' }]}>
                    Selecione o estabelecimento
                </Text>

            );
        }
        return null;
    };
    const renderLabelCategoria = () => {
        if (valueCategoria || isFocusCategoria) {
            return (
                <Text style={[styles.label, isFocusCategoria && { color: 'blue' }]}>
                    Selecione a Categoria
                </Text>
            )
        }
    }

    const getFilteredEstablishments = () => {
        if (!valueCidade || !valueCategoria) return [];
        const filtered = dadosEstab.filter(estab => estab.ValueId2Cidade === valueCidade && estab.ValueId2Categoria === valueCategoria);


        return filtered;
    };
    const getFilteredProducts = () => {
        if (!valueEstab) return [];
        const filtered = dadosProdutos.filter(produto => {
            return produto.ValueId2Estab === valueEstab;
        });
        return filtered;
    };

    //função para abrir o formulário de atualização
    const handleUpdateProduct = async () => {
        try {
            const response = await fetch(`https://api-cotapreco.onrender.com/product/${valueProduto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Produto atualizado com sucesso!');
                setShowForm(false);
            } else {
                alert('Erro ao atualizar produto');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao atualizar produto');
        }
    };

    const handleChangePrice = (text: string) => { // Substituir vírgula por ponto 
        const formattedText = text.replace(',', '.');
        setFormData({ ...formData, preco: formattedText });
    };

    return (

        <ScrollView>
            <Text style={styles.title}>Selecione as opções abaixo</Text>
            <View style={styles.container}>
                {renderLabelCidade()}
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
                    valueField="value"
                    placeholder={!isFocusCidade ? 'Selecionar Cidade' : '...'}
                    searchPlaceholder="Search..."
                    value={valueCidade}
                    onFocus={() => setIsFocusCidade(true)}
                    onBlur={() => setIsFocusCidade(false)}
                    onChange={item => {
                        setValueCidade(item.value);
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
            <View style={styles.container}>
                {renderLabelCategoria()}
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
                    valueField="value"
                    placeholder={!isFocusCategoria ? 'Selecionar Categoria' : '...'}
                    searchPlaceholder="Search..."
                    value={valueCategoria}
                    onFocus={() => setIsFocusCategoria(true)}
                    onBlur={() => setIsFocusCategoria(false)}
                    onChange={item => {
                        setValueCategoria(item.value);
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

            <View style={styles.container}>
                {renderLabelestabelecimento()}
                <Dropdown
                    style={[styles.dropdown, isFocusEstab && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}

                    data={getFilteredEstablishments()}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={valueEstab}
                    disable={!valueCidade}
                    placeholder={!valueCidade ? 'Selecione uma cidade primeiro' : 'Selecionar Estabelecimento'}
                    searchPlaceholder="Search..."

                    onFocus={() => setIsFocusEstab(true)}
                    onBlur={() => setIsFocusEstab(false)}
                    onChange={item => {
                        console.log('Selected establishment:', item);
                        setValueEstab(item.value);
                        setIsFocusEstab(false);
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
            <View style={styles.container}>
                {renderLabelProduto()}
                <Dropdown
                    style={[styles.dropdown, isFocusProduto && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={getFilteredProducts()}
                    search
                    maxHeight={300}
                    labelField="label"
                    value={valueProduto}
                    valueField="value"
                    disable={!valueEstab}
                    placeholder={!valueProduto ? 'Selecione um estabelecimento primeiro' : 'Selecionar Produto'}
                    searchPlaceholder="Search..."
                    onFocus={() => setIsFocusProduto(true)}
                    onBlur={() => setIsFocusProduto(false)}
                    onChange={item => {
                        console.log('Selected product:', item);
                        setValueProduto(item.value);
                        setIsFocusProduto(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={isFocusProduto ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
            </View>

            {valueProduto && ( // Renderiza o formulário apenas se houver um produto selecionado
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do produto"
                        returnKeyType='next'
                        value={formData.nome}
                        onChangeText={(text) => setFormData({ ...formData, nome: text })}
                        onSubmitEditing={() => inputPrecoRef.current?.focus()} />
                    <TextInput
                        style={styles.input}
                        placeholder="Preço"
                        value={formData.preco}
                        keyboardType="numeric"
                        ref={inputPrecoRef}
                        returnKeyType='next'
                        onChangeText={handleChangePrice}
                        onSubmitEditing={() => inputDescriRef.current?.focus()} />
                    <TextInput
                        style={styles.input}
                        placeholder="Descrição"
                        value={formData.descricao}
                        ref={inputDescriRef}
                        multiline
                        onChangeText={(text) => setFormData({ ...formData, descricao: text })}
                        returnKeyType='done'
                        onSubmitEditing={handleUpdateProduct}
                    />
                    <Button
                        title="Atualizar Produto"
                        onPress={handleUpdateProduct}
                    />
                </View>
            )}
        </ScrollView>



    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    title: {
        color: 'blue',
        padding: 24,
        textAlign: 'center',
        backgroundColor: 'white',
        fontSize: 18
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    formContainer: {
        backgroundColor: 'white',
        padding: 16,
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    }
});