import { Image } from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import icon from "../../constants/icon";

import AbaHome from "../abahome/abahome";
import AbaCalendar from "../abacalendar/abacalendar";
import AbaProfile from "../abaProfile/abaprofile";


const Tab = createBottomTabNavigator();

function Main() {
    return  <Tab.Navigator>
                <Tab.Screen name="Home" component={AbaHome} options={{
                    headerTitleAlign: "center",
                    headerTitle: () => {
                        return <Image source={icon.logoHome} style={
                            {width: 250, height:150}
                        }/>
                    },
                    tabBarShowLabel: false,
                    tabBarIcon: ({focused}) => {
                        return <Image source={icon.home}  style={
                            {
                                width: 30,
                                height: 30,
                                opacity: focused ? 1 : 0.3
                            }
                        }/>
                    }
                }}/>

                <Tab.Screen name="Calendar" component={AbaCalendar}
                    options={{
                        headerTitleAlign: "center",
                        headerTitle: () => {
                            return <Image source={icon.logoHome} style={
                                {width: 250, height:150}
                            }/>
                        },
                        tabBarShowLabel: false,
                        tabBarIcon: ({focused}) => {
                            return <Image source={icon.calendar}  style={
                                {
                                    width: 30,
                                    height: 30,
                                    opacity: focused ? 1 : 0.3
                                }
                            }/>
                        }
                    }}/>

                <Tab.Screen name="Profile" component={AbaProfile}
                    options={{
                        headerTitleAlign: "center",
                        headerTitle: () => {
                            return <Image source={icon.logoHome} style={
                                {width: 250, height:150}
                            }/>
                        },
                        tabBarShowLabel: false,
                        tabBarIcon: ({focused}) => {
                            return <Image source={icon.profile}  style={
                                {
                                    width: 30,
                                    height: 30,
                                    opacity: focused ? 1 : 0.3
                                }
                            }/>
                        }
                    }}/>
            </Tab.Navigator>
}

export default Main;