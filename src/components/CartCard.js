import { View, Text, Image, TouchableOpacity, FlatList, ToastAndroid } from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { decreaseQuantity, removeFromCart, addToCart, increaseQuantity } from "../redux/cartReducer";
import { decrementQuantity, incrementQuantity } from "../redux/cartReducer";
import { useFocusEffect } from "@react-navigation/native";
const CartCard = (props) => {
  const navigation = useNavigation();
    const [count, setCount] = useState(props.counter)
    const[price, setPrice] = useState(props.itemPrice)
    const { authToken } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    function showToast(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const fetchCart = async () => {
      axios({
        method: "GET",
        url: `https://grocery-9znl.onrender.com/api/v1/cart/`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }) 
        .then((response) => {
          setCartData(response.data.data.items);
          console.log('CART DATA', response.data.data.items)
          showToast("items in cart");   
          setCartId(response.data.data)
          setIsLoading(false);
             
          cartData.map((item)=>{
            dispatch(addItemToCart(item))
          })
        })
        .catch((error) => {
          console.log("error in cart page", error);
          showToast(error.response.data.message);
        });
    };
    useFocusEffect(
      React.useCallback(() => {
        // Fetch cart data or perform any other actions when the screen is focused.
        fetchCart(); // Example: Fetch cart data
      }, [])
    ); 

    const updateCartItem = async () => {
      axios({
        method: "PATCH",
        url: `https://grocery-9znl.onrender.com/api/v1/cart/updateItem/${props.itemId}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          count
        },
      })
        .then((response) => {
          console.log("response from cartCard: ", response.data);
          showToast(response.data.message)
        })
        .catch((error) => {
          console.log("error in cart page", error);
          alert(error.response.data.message);
          showToast(error.response.data.message)
        });
    };

    const countUp = ()=>{
      let y = price
      setCount(count+1)
      updateCartItem()
      setPrice(price + y)
      // dispatch(decrementQuantity(props.item))
    }
    const countDown = ()=>{
      setCount(count - 1)
      setPrice(price / 2)
      updateCartItem()
      // dispatch(incrementQuantity(props.item))
    }



 
  return (
    <TouchableOpacity
      className="flex-row  m-3 mx-2 bg-gray-100 p-2  shadow-xl w-[99%] rounded-md justify-between items-center  relative "
      
    >
      <View className="absolute top-1 left-1 bg-orange-400 z-10 p-[2px] px-1 rounded-sm">
        <Text className="text-xs text-white font-bold" style={{fontFamily:"poppins_semibold"}}>{props.percentage}</Text>
      </View>
      <View className="flex-row  w-[70%] justify-start justify-items-start">
        <View className="flex-col w-24  p-1 rounded-md mr-6 bg-white justify-center items-center ">
          <Image
          style={{resizeMode:"contain"}}
            source={{uri:props.source}}
            className="w-20 h-20  object-contain  "
          />
        </View>
        <View className=" w-[60%]  items-start justify-start gap-1">
          <Text className="text-center text-black  text-xs font-semibold" style={{fontFamily:"poppins_semibold"}}>
            {props.title}
          </Text>
          <Text className="text-center text-gray-500 text-xs font-semibold" style={{fontFamily:"poppins"}}>
            {props.location}
          </Text>
          <Text className="text-center text-gray-500  text-xs font-semibold " style={{fontFamily:"poppins_semibold"}}>
            {props.weight}
          </Text>
          <View className="flex-row gap-1 items-center">
            <Text className="text-center m-1 text-green-500 font-bold" style={{fontFamily:"poppins_semibold"}}>
              {price} <Text className="text-xs">Rwf</Text>
            </Text>
            <Text className="text-center text-gray-400 text-xs line-through font-semibold" style={{fontFamily:"poppins_semibold"}}>
              {props.discounted}Rwf
            </Text>
          </View>
        </View>
      </View>
      <View className="pr-2  h-full w-[20%] flex-col ">
        <TouchableOpacity className="flex-row justify-center rounded gap-2 my-1 mb-4" onPress={props.removeItem}>
          <Icon name="clipboard-outline" color="red" size={15} />
          <Text className="text-red-500" style={{fontFamily:"poppins_semibold"}}>Delete</Text>
        </TouchableOpacity>
        <View className="flex-row gap-1 text-lg bg-white h-[50px] self-end rounded justify-between align-center pr-1 ]">
          <TouchableOpacity className="bg-gray-800 flex-col h-10 rounded items-center justify-center p-1 ">
            <Text onPress={countDown} className="text-2xl text-bold text-white  self-center" style={{fontFamily:"poppins"}}>-</Text>
          </TouchableOpacity>
          <Text className="text-2xl m-auto mx-1 text-center  h-full pt-1" style={{fontFamily:"poppins_semibold"}}>{count}</Text>
          <TouchableOpacity onPress={countUp} className="bg-gray-800 flex-col h-10 rounded items-center justify-center p-1 ">
            <Text className="text-2xl text-white text-bold" style={{fontFamily:"poppins"}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartCard;
