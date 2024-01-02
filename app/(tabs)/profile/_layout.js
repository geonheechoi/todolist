import {Stack} from "expo-router"
import {Tabs} from "expo-router"
export default function Layout(){
    return (
        <Stack screenOptions ={{headerShown:false}}> 
            <Stack.Screen name="index"/>
        </Stack>
    )
}