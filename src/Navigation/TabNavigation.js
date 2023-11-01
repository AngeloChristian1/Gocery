import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, incrementQuantity, decrementQuantity } from "../redux/cartReducer";
import axios from "axios";


const Tab = createMaterialBottomTabNavigator();

function TabNavigator() {

  const { authToken } = useSelector((state) => state.auth);
  const [cartData, setCartData] = useState([]);


  const dispatch =useDispatch()


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
        
      })
      .catch((error) => {
        console.log("error in cart page", error);
      });
  };
  
  useEffect(() => {
    if (authToken) {
      fetchCart();
  
    }
  }, [authToken]);

  useEffect(()=>{
    if(cartData){
      cartData.map((item)=>{
        key=item._id
        console.log("items in cart",item)
        dispatch(addToCart(item))
      })
    }
  },[])

  const cart = useSelector((state)=> state.cart.cart)
  console.log("redux cart",cart)


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
        component={StackNavigator}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View className="text-center  items-center">
            <MaterialCommunityIcons name="storefront-outline" size={24} color={focused ? "#08C25E" : "gray"} />

              <Text
                className="my-1 text-xs text-gray-500"
                style={{ color: focused ? "#08C25E" : "gray",fontFamily:"poppins" }}
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
           {cart.length > 0 && <Text className="bg-red-500 absolute text-white rounded-full text-[10px]  text-center items-center justify-center z-10 right-0 px-1">{cart.length}</Text>}
              <FontAwesome5
                name="shopping-basket"
                size={20}
                color={focused ? "#08C25E" : "gray"}
              />
              <Text
                className="my-1 text-xs text-gray-500 text-center"
                style={{ color: focused ? "#08C25E" : "gray",fontFamily:"poppins" }}
                
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
                style={{ color: focused ? "#08C25E" : "gray",fontFamily:"poppins" }}

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
                style={{ color: focused ? "#08C25E" : "gray",fontFamily:"poppins" }}

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
