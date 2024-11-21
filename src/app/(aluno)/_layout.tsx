import { Stack } from "expo-router"

export default function LayoutAluno() {
    return (
        <>
            <Stack screenOptions={{ headerTitleAlign: 'center' }}>
                <Stack.Screen name='user' options={{ title: 'Entrar', headerShown: false }} />
                <Stack.Screen name='login' options={{ title: "Logar" }} />
                <Stack.Screen name='primeiro_acesso' options={{ title: "Faça seu cadastro" }} />

                <Stack.Screen name='menuAluno' options={{ title: 'Menu Aluno' }}/>
                <Stack.Screen name='categorias/index' options={{ title: 'Menu Produtos' }}/>
                <Stack.Screen name='categorias/mercado' options={{ title: 'Mercado' }}/>

                <Stack.Screen name="cadastros/index" options={{title: 'cadastro'}}/>
            </Stack>
        </>

    )
}