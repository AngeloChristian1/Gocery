import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { useState, useEffect } from "react";
import { View, Image, Text } from "react-native";
import Account from "../BottomTab/Account";
import CartPage from "../Stack/cart/CartPage";
import Icon from "react-native-vector-icons/Ionicons";
import { Fontisto, Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import TopBarOrderNavigator from "../Stack/MyOrder/TopNavigator";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../redux/cartReducer";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import Statistics from "../Stack/statistics/Statistics";
import NotFound from "../Stack/NotFound";
import StackNavigator from "./StackNavigation";
import { useFocusEffect } from "@react-navigation/native";
import Main from "../Stack/Main";

const Tab = createMaterialBottomTabNavigator();

export const ManagerTabVavigator = () => {
  return (
    <Tab.Navigator
      className="bg-green-200"
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: "red", border: 1 },
        className: "bg-red-300",
      }}
    >
      <Tab.Screen
        name="Stats"
        component={Statistics}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View className="text-center  items-center">
              <Octicons
                name="graph"
                size={24}
                color={focused ? "#08C25E" : "gray"}
              />
              <Text
                className="my-1 text-xs text-gray-500 w-12 text-center"
                style={{
                  color: focused ? "#08C25E" : "gray",
                  fontFamily: "poppins",
                }}
              >
                Stats
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
                style={{
                  color: focused ? "#08C25E" : "gray",
                  fontFamily: "poppins",
                }}
              >
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};


function TabNavigator() {
  const { authToken, authProfile,authLoaded } = useSelector((state) => state.auth);
  const [cartData, setCartData] = useState([]);
  const [profile, setProfile] = useState({});
  const [number, setNumber] = useState(0)
  const getProfile = async () => {
    let userProfile = await getItemAsync("authProfile");
    setProfile(JSON.parse(userProfile));
  };
  useEffect(() => {
    getProfile();
  }, []);

  const dispatch = useDispatch();

  const fetchCart = async () => {
    axios({
      method: "GET",
      url: `https://grocery-9znl.onrender.com/api/v1/cart/`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        // console.log("response from cart: ", response.data.data.items);
        setCartData(response.data.data.items);
        setNumber(cartData.length)
      })
      .catch((error) => {
        console.log("error in cart page", error);
        setNumber(0)
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch cart data or perform any other actions when the screen is focused.
      fetchCart(); // Example: Fetch cart data
    }, [])
  );

  useEffect(() => {
    if (cartData) {
      cartData.map((item) => {
        key = item._id;
        console.log("items in cart", item);
        dispatch(addToCart(item));
      });
    }
  }, []);

  const cart = useSelector((state) => state.cart.cart);
  console.log("redux cart", cart);

  console.log("Profile from stack:", profile);
  console.log("authProfile:", authProfile);

  if (!authLoaded) {
    return null
  }

  return (
    <Tab.Navigator
      className="bg-green-200"
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: "red", border: 1 },
        className: "bg-red-300",
      }}
    >
      
          <Tab.Screen
            name="Shop"
            component={Main}
            options={{
              tabBarLabel: "",
              tabBarIcon: ({ focused }) => (
                <View className="text-center  items-center">
                  <MaterialCommunityIcons
                    name="storefront-outline"
                    size={24}
                    color={focused ? "#08C25E" : "gray"}
                  />

                  <Text
                    className="my-1 text-xs text-gray-500 w-12 text-center"
                    style={{
                      color: focused ? "#08C25E" : "gray",
                      fontFamily: "poppins",
                    }}
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
                <View className="text-center  items-center rounded-full relative ">
                  {number > 0 && (
                    <Text className="bg-red-500 absolute text-white rounded-full text-[10px]  text-center items-center justify-center z-10 right-0 px-1">
                      {number}
                    </Text>
                  )}
                  <FontAwesome5
                    name="shopping-basket"
                    size={20}
                    color={focused ? "#08C25E" : "gray"}
                  />
                  <Text
                    className="my-1 text-xs text-gray-500 text-center"
                    style={{
                      color: focused ? "#08C25E" : "gray",
                      fontFamily: "poppins",
                    }}
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
                    style={{
                      color: focused ? "#08C25E" : "gray",
                      fontFamily: "poppins",
                    }}
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
              style={{
                color: focused ? "#08C25E" : "gray",
                fontFamily: "poppins",
              }}
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


// <Tab.Screen
//             name="Stats"
//             component={Statistics}
//             options={{
//               tabBarLabel: "",
//               tabBarIcon: ({ focused }) => (
//                 <View className="text-center  items-center">
//                   <Octicons
//                     name="graph"
//                     size={24}
//                     color={focused ? "#08C25E" : "gray"}
//                   />
//                   <Text
//                     className="my-1 text-xs text-gray-500 w-12 text-center"
//                     style={{
//                       color: focused ? "#08C25E" : "gray",
//                       fontFamily: "poppins",
//                     }}
//                   >
//                     Stats
//                   </Text>
//                 </View>
//               ),
//             }}
//           />
