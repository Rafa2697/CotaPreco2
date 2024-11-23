import { Stack } from "expo-router"

export default function LayoutAluno() {
    return (
        <>
            <Stack screenOptions={{ headerTitleAlign: 'center' }}>
                <Stack.Screen name='user' options={{ title: 'Entrar', headerShown: false }} />
                <Stack.Screen name='login' options={{ title: "Logar" }} />
                <Stack.Screen name='primeiro_acesso' options={{ title: "Faça seu cadastro" }} />

                <Stack.Screen name='categorias/index' options={{ title: 'Atualizaço de produtos' }}/>
                <Stack.Screen name="cadastros/index" options={{title: 'cadastro'}}/>
            </Stack>
        </>

    )
}