import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

export default function Layout() {
    return (
        <>
            <StatusBar
                backgroundColor="#25328A"
                translucent={true}
                style="inverted"

            />
            <Tabs screenOptions={{ headerShown: false }}>
                <Tabs.Screen name="(cliente)" options={{
                    tabBarIcon: ({ size, color }) => <Feather name="home" size={size} color={color} />,
                    tabBarLabel: 'Home'
                }}/>
                <Tabs.Screen name="(aluno)" options={{
                    tabBarIcon: ({ size, color }) => <Feather name="user" size={size} color={color} />,
                    tabBarLabel: 'Perfil'
                }}/>
                    
            </Tabs>
                
        </>

    )
}