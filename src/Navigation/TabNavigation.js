import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View, Image, Text } from "react-native";
import Account from "../BottomTab/Account";
import Cart from "../BottomTab/Cart";
import CartPage from "../Stack/cart/CartPage";
import MyOrder from "../BottomTab/MyOrder";
import Shop from "../BottomTab/Shop";
import StackNavigator from "./StackNavigation";
import Icon from "react-native-vector-icons/Ionicons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import TopBarOrderNavigator from "../Stack/MyOrder/TopNavigator";

const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: "red", border: 1 },
        className: "bg-red-300",
      }}
    >
      <Tab.Screen
        name="Shop"
        component={StackNavigator}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View className="text-center  items-center">
              <Fontisto
                name="shopping-store"
                size={20}
                color={focused ? "#08C25E" : "gray"}
              />
              <Text
                className="my-1 text-xs text-gray-500"
                style={{ color: focused ? "#08C25E" : "gray" }}
              >
                Shop
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartPage}
        options={{
          tabBarLabel: "",

          tabBarIcon: ({ focused }) => (
            <View className="text-center  items-center rounded-full  ">
              <FontAwesome5
                name="shopping-basket"
                size={20}
                color={focused ? "#08C25E" : "gray"}
              />
              <Text
                className="my-1 text-xs text-gray-500 text-center"
                style={{ color: focused ? "#08C25E" : "gray" }}
              >
                Cart
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Order"
        component={TopBarOrderNavigator}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View className="text-center  items-center">
              <MaterialCommunityIcons
                name="shopping-outline"
                size={20}
                color={focused ? "#08C25E" : "gray"}
              />
              <Text
                className="my-1 text-xs text-gray-500 text-center w-[100%]"
                style={{ color: focused ? "#08C25E" : "gray" }}
              >
                My Order
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View className="text-center  items-center">
              <MaterialCommunityIcons
                name="account-multiple"
                size={20}
                color={focused ? "#08C25E" : "gray"}
              />
              <Text
                className="my-1 text-xs  text-center w-[100%] "
                style={{ color: focused ? "#08C25E" : "gray" }}
              >
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
