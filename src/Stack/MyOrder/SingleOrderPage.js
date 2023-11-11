
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, TouchableOpacity, ToastAndroid, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import GoBackButton from '../../components/GoBackButton';

const SingleOrderPage = ({props, route}) => {
    let order = route.params[0]
    const { authToken } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState({});
    const [orderId, setOrderId] = useState(order._id)
    const [isLoading, setIsLoading] = useState(false)
    let cart = order.cartId
    let cartItems = cart.items
    console.log("cartItems in single", cartItems[0])
    const navigation =useNavigation()

    function showToast(message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }

  const checkOrder = async () => {
    axios({
      method: "POST",
      url: `https://grocery-9znl.onrender.com/api/v1/cart/confirmdelivery/${order._id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        showToast(response.data.message)
        setIsLoading(false)
        navigation.navigate("History")
      })
      .catch((error) => {
        console.log("error in cart page", error);
        
      });
  };
    return (
      
        <View className="relative p-3 px-0 m-1 flex-col justify-between mt-14 bg-white ">
        {isLoading ? (
          <View className=" w-full h-[100vh] bg-green-200 opacity-30   z-30 bg-opacity-30 backdrop-filter backdrop-blur-lg  top-0  absolute justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View></View>
        )}
      <View className="mt-[-20] absolute ">
      <GoBackButton/>
      </View>
        
        <View className="justify-center align-center flex-col flex border-b-0 bg-white">
        <Text className="font-semibold text-lg text-center" style={{fontFamily:"poppins_semibold"}}>Order Description</Text>
        <View className="flex-row gap-2 items-center mr-3 w-full self-center justify-center">
            <FontAwesome name="dot-circle-o" size={15} color="green" />
            <Text className="ml-2 " style={{fontFamily:"poppins"}}>{order.orderStatus}</Text>
            </View>
        <View className="w-full border-gray-300 border-[.5px] my-3"></View>
      </View>
      <View className="flex-col gap-2 m-2">
      <Text className="text-gray-500  mr-[-15px]" style={{fontFamily:"poppins"}}>Order ID:   <Text className="  text-gray-700" style={{fontFamily:"poppins_semibold"}}>{order._id}</Text></Text>
      <Text className=" text-gray-500" style={{fontFamily:"poppins"}}>Transaction ID:  <Text className=" text-black  mr-3 " style={{fontFamily:"poppins_semibold"}}>{order.transactionId}</Text> </Text>
      
      <View className="flex-row ">
      <Text className=" text-gray-500 mr-2" style={{fontFamily:"poppins_semibold"}}>Date:</Text>
      <Text className="  " style={{fontFamily:"poppins_semibold"}}>{order.date}</Text>
      </View>

      <View className="flex-row items-center ">
      <Text className=" text-gray-500 mr-3 " style={{fontFamily:"poppins_semibold"}}>Total Payment:</Text>
      <Text className="text-l text-black  " style={{fontFamily:"poppins_semibold"}}>{order.totalAmount}</Text>   
      </View>


      <View className="flex-row items-center ">
      <Text className=" text-gray-500 mr-3 " style={{fontFamily:"poppins_semibold"}}>Deliver to:</Text>
      <Text className=" mr-3 " style={{fontFamily:"poppins_semibold"}}>{order.deliveryAddress}</Text>

      </View>
      <View className="flex-row items-center ">
      <Text className=" text-gray-500 mr-3 " style={{fontFamily:"poppins_semibold"}}>Telephone:</Text>
      <Text className=" mr-3 " style={{fontFamily:"poppins_semibold"}}>{order.telephone}</Text>

      </View>
      <View className="flex-row items-center ">
      <Text className=" text-gray-500 mr-3 " style={{fontFamily:"poppins_semibold"}}>Deliver to:</Text>
      <Text className=" " style={{fontFamily:"poppins_semibold"}}>{order.deliveryAddress}</Text>

      </View>
      <View className="flex-row items-center ">
      <Text className=" text-gray-500 mr-3 " style={{fontFamily:"poppins_semibold"}}>Items In bought:</Text>
      <Text className=" mr-3 " style={{fontFamily:"poppins_semibold"}}>{cartItems.length}</Text>
      </View>

      </View>

          <View className="my-2 border-gray-300 bottom-0 w-[100%] border-[.5px] mx-3"></View>
          
          {cartItems.map((item)=>{
            <Text> {item._id}</Text>
          })}
          <FlatList
          data={cartItems}
          renderItem={({item})=>{
            <Text> {item._id}</Text>

          }}
          />

          <TouchableOpacity 
          onPress={()=>{setIsLoading(true); checkOrder()  }} className="bg-primary p-2 rounded justify-center items-center my-4">
          <Text style={{fontFamily:"poppins_semibold", color:"white"}}>Item Received</Text>
          </TouchableOpacity>
        </View>
      
      );
}

export default SingleOrderPage