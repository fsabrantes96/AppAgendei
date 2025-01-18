import {COLORS} from "../constants/theme.js"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from "../screens/main/main.jsx";
import Services from "../screens/services/services.jsx";
import Schedule from "../screens/schedule/schedule.jsx";

const Stack = createNativeStackNavigator();

function RoutesPrivate() {
    return <Stack.Navigator>
        <Stack.Screen name="main" component={Main}
        options={{
            headerShown: false
        }} />

        <Stack.Screen name="services" component={Services}
        options={{
            headerTitle: "Serviços",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerTintColor: COLORS.bordo,
            headerStyle:{
                backgroundColor: COLORS.creme
            }
        }} />

        <Stack.Screen name="schedule" component={Schedule}
        options={{
            headerTitle: "Agendar uma data",
            headerTitleAlign: "center",
            headerShadowVisible: false,
            headerTintColor: COLORS.bordo,
            headerStyle:{
                backgroundColor: COLORS.creme
            }
        }} />
    </Stack.Navigator>
}

export default RoutesPrivate;