import { Feather, MaterialIcons,  FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const SingleOrderPage = ({props, route}) => {
    let order = route.params[0]
    const { authToken } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState({});
    const [orderId, setOrderId] = useState(order._id)
    
    let cart = order.cartId
    let cartItems = cart.items
    console.log("route in single", order._id)
    const navigation =useNavigation()

    function showToast(message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }

  const checkOrder = async () => {
    axios({
      method: "POST",
      url: `https://grocery-9znl.onrender.com/api/v1/cart/confirmdelivery/${ order._id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log(
          "response single order page___________: ",
          response.data.message
        );
        showToast(response.data.message)
        
        
        
      })
      .catch((error) => {
        console.log("error in cart page", error);
        
      });
  };
    return (
      
        <View className="p-3 px-0 m-1 flex-col justify-between mt-14">
          <View className="gap-2 flex-col">
            <View className="flex-row gap-2 items-center justify-between">
              <Text className="text-gray-500 text-xs mr-[-15px]" style={{fontFamily:"poppins"}}>Order ID:   <Text className="text-xs  text-gray-700" style={{fontFamily:"poppins_semibold"}}>{order._id}</Text></Text>
              
            </View>
            <View className="gap-2 flex-row items-center justify-start">
            <Text className="text-xs text-gray-500" style={{fontFamily:"poppins"}}>Transaction ID:  <Text className="text-xs text-black  mr-3 " style={{fontFamily:"poppins_semibold"}}>{order.transactionId}</Text> </Text>
          </View>
            <View className="gap-2 flex-row items-center">
              <Text className="text-xs text-gray-500" style={{fontFamily:"poppins_semibold"}}>Date:</Text>
              <View className="flex-row align-center mt-[-10] items-center">
                <Text className="text-xs mr-3 " style={{fontFamily:"poppins_semibold"}}>{order.date}</Text>
              </View>
            </View>
          </View>
          <View className="gap-2 flex-col">
            <View className="flex-row gap-2 items-center mr-3 ">
            <FontAwesome name="dot-circle-o" size={15} color="green" />
            <Text className="ml-2 " style={{fontFamily:"poppins"}}>{order.orderStatus}</Text>
            </View>
            <View className="gap-2 flex-row items-center">
            <Text className="text-xs text-gray-500" style={{fontFamily:"poppins"}}>Total Payment:</Text>
            <View className="flex-row align-center items-center ">
              <Text className="text-l text-black  mr-3 " style={{fontFamily:"poppins_semibold"}}>{order.totalAmount}</Text>   
            </View>
          </View>
          <View className="gap-2 flex-row items-center">
          <Text className="text-xs text-gray-500" style={{fontFamily:"poppins_semibold"}}>Deliver to:</Text>
          <View className="flex-row align-center mt-[-10] items-center">
            <Text className="text-xs mr-3 " style={{fontFamily:"poppins_semibold"}}>{order.deliveryAddress}</Text>
          </View>
        </View>
          <View className="gap-2 flex-row items-center">
          <Text className="text-xs text-gray-500" style={{fontFamily:"poppins_semibold"}}>Telephone:</Text>
          <View className="flex-row align-center mt-[-10] items-center">
            <Text className="text-xs mr-3 " style={{fontFamily:"poppins_semibold"}}>{order.telephone}</Text>
          </View>
        </View>
          <View className="gap-2 flex-row items-center">
          <Text className="text-xs text-gray-500" style={{fontFamily:"poppins_semibold"}}>Deliver to:</Text>
          <View className="flex-row align-center mt-[-10] items-center">
            <Text className="text-xs mr-3 " style={{fontFamily:"poppins_semibold"}}>{order.deliveryAddress}</Text>
          </View>
        </View>
            
          </View>

       
          <View className="my-2 border-gray-300 bottom-0 w-[100%] border-[.5px] mx-3"></View>
          <View className="mx-3">
          <Text>Items In cart</Text>
          </View>

          <TouchableOpacity onPress={checkOrder} className="bg-primary p-2 rounded justify-center items-center my-4">
          <Text>Item Received</Text>
          </TouchableOpacity>
        </View>
      
      );
}

export default SingleOrderPage