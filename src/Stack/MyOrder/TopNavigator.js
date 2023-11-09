import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Canceled from "./Canceled";
import InProgress from "./InProgress";
import Completed from "./Completed";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import GoBackButton from "../../components/GoBackButton";
import GoHomeButton from "../../components/GoHomeButton";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Orders"
      options={{
        activeTintColor: "#08C25E",
        labelStyle: { fontSize: 12 },
        headerShown: true,
        headerShadowVisible: true,
        headerTintColor: "#08C25E",
        style: {
          backgroundColor: "white",
          marginTop: 50,
          fontFamily: "poppins",
        },
      }}
    >
      <Tab.Screen
        name="InProgress"
        component={InProgress}
        options={{ tabBarLabel: "In Progress" }}
      />

      <Tab.Screen
        name="History"
        component={Canceled}
        options={{ tabBarLabel: "History", style: { fontFamily: "poppins" } }}
      />
    </Tab.Navigator>
  );
}

export default function TopBarOrderNavigator() {
  const navigation = useNavigation();
  return (
    <View className="relative h-full w-full bg-white pt-20">
      <View className="absolute top-2">
        <GoHomeButton />
      </View>

      <MyTabs />
    </View>
  );
}
