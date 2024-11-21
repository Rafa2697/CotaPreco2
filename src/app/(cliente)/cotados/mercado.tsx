import { StyleSheet, Text, View, FlatList, SectionList } from 'react-native'
import React, { useState, useRef } from 'react';


import { CATEGORIES, PRODUCTS } from "../../../utils/produtos_test"
import { Product } from '../../../components/product'
import { Category } from '../../../components/category'


export default function Mercado() {
  const [category, setCategory] = useState(CATEGORIES[0]) 
  const sectionListRef = useRef<SectionList>(null)

  //função para filtrar cada produto pela cidade selecionada

  function handleCategorySelect(selectedCategory: string) { //função para selecionar a categoria
    setCategory(selectedCategory) //setando a categoria selecionada

    const sectionIndex = CATEGORIES.findIndex( //pegando o index da categoria selecionada
      (category) => category === selectedCategory //comparando se a categoria selecionada é igual a categoria que está sendo renderizada
    )

    if (sectionListRef.current) { //se a sectionListRef está definida
      sectionListRef.current.scrollToLocation({ //scrollando para a categoria selecionada
        animated: true,
        sectionIndex,
        itemIndex: 0,
      })
    }
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES} //renderizando o componente de categorias
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Category
            title={item}
            onPress={() => handleCategorySelect(item)}
            isSelected={item === category}
          />
        )}
        style={styles.categories}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 32,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal //renderizando na horizontal
      />


      <SectionList
        ref={sectionListRef}
        sections={PRODUCTS} //recebendo os produtos do componente.
        keyExtractor={(item) => String(item.nome)}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => <Product nome={item.nome} valor={item.valor} />}//rederizando os itens 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.sectionContainer}
        renderSectionHeader={({ section: { title } }) => ( //texto da sessão do itens de produtos
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "white",
    paddingTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    color: "Black",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 18,
    marginTop: 32,
  },
  categories: {
    height: 46,
  },
  sectionContainer: {
    paddingBottom: 100,
    paddingHorizontal: 32,
  },
})