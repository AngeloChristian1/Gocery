import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Canceled from "./Canceled";
import InProgress from "./InProgress";
import Completed from "./Completed";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();



function MyTabs() {
  return (

    <Tab.Navigator
      initialRouteName="Orders"
      tabBarOptions={{
        activeTinitColor: "#e91e63",
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: "white", marginTop:50 },
        
      }}
    >
      <Tab.Screen
        name="Completed"
        component={Completed}
        options={{ tabBarLabel: "Completed" }}
      />
      <Tab.Screen
        name="InProgress"
        component={InProgress}
        options={{ tabBarLabel: "In Progress" }}
      />
      <Tab.Screen
        name="Canceled"
        component={Canceled}
        options={{ tabBarLabel: "Canceled" }}
      />
    </Tab.Navigator>

  );
}

export default function TopBarOrderNavigator(){
    return(
      
        <MyTabs />
        
    )
}