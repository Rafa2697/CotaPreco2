import { View, StyleSheet, Text } from "react-native"

interface ProductProps {
  nome: string;
  valor: number;
  [key: string]: any;
}

export function Product({ nome, valor, ...rest }: ProductProps) {
  return (
    <View style={styles.containerItem} {...rest} >
      <Text style={styles.textItem}>{nome}</Text>
      <Text style={styles.textItem}>{valor.toLocaleString('pt-BR', {style:'currency', currency:'BRL'})}</Text>
    </View> //item que será renderizado

  )

}


const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#505059",
    height: 82,
    width: "100%",
    marginBottom: 16,
    borderRadius: 12,
  },
  textItem:{
    color: 'white',
    fontSize:24,
    textAlign:'center',
    paddingTop: 5
    
  }
})