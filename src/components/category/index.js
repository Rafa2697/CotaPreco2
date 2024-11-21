import { Text, Pressable, StyleSheet } from "react-native"



export function Category({
  title,
  isSelected = false,
  ...rest
}) {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.selected]}
      {...rest}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
      height: 42,
      paddingHorizontal: 18,
      borderRadius: 7,
      justifyContent: "center",
    },
    title: {
      color: "#25328A",
      fontSize: 16,
      fontWeight: "bold",
    },
    selected: {
      backgroundColor: "#E8E8E8",
    },
  })