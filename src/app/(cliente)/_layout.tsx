import { Stack } from "expo-router"


export default function LayoutCliente() {
    return (
        <>
            <Stack screenOptions={{ headerTitleAlign: 'center' }}>

                <Stack.Screen name="index" options={{
                    headerShown: false,
                    contentStyle: {
                        paddingTop: 20
                    }
                }} />
                <Stack.Screen name="cotados/mercado" options={{
                    headerShown: true,
                    title:'Produtos Cotados'
                }} />
            </Stack>
        </>
    )
}