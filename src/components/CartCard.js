import { View, Text, Image, TouchableOpacity, FlatList, ToastAndroid } from "react-native";
import React, {useState, useEffect} from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { getItemAsync, setItemAsync } from "expo-secure-store";

const CartCard = (props) => {
  const navigation = useNavigation();
    const [count, setCount] = useState(props.counter)
    const { authToken } = useSelector((state) => state.auth);
    const [storageCart,setStorageCart]=useState([])

    function showToast(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const getCartFromStorage = async () => {
      let userCart = await getItemAsync("userCart");
      setStorageCart(JSON.parse(userCart));
    };
    useEffect(() => {
      getCartFromStorage();
    }, []);

    const countUp = async ()=>{
            setCount(count+1)
            console.log("storage CartCard",storageCart)
            await updateCartItem()
    }

    // decrementing item
    const countDown = async ()=>{
      if(count >0){
         setCount(count-1)
        await updateCartItem()
      }
        if(count === 0){
            alert("item will be removed from list")
            showToast("item will be removed from list")
        }   
    }

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
          // setCartData(response.data.data.items);
          // alert(response.data.message)
          showToast(response.data.message)
        })
        .catch((error) => {
          console.log("error in cart page", error);
          alert(error.response.data.message);
          showToast(error.response.data.message)
        });
    };
    const deleteCartItem = async () => {
      axios({
        method: "DELETE",
        url: `https://grocery-9znl.onrender.com/api/v1/cart/deleteItem/${props.itemId}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        }
      })
        .then((response) => {
          console.log("response from cartCard: ", response.data);
          // setCartData(response.data.data.items);
          showToast(response.data.message)
          alert(response.data.message)
        })
        .catch((error) => {
          console.log("error in cart page", error);
          showToast(error.response.data.message)
          alert(error.response.data.message);
        });
    };

 
  return (
    <TouchableOpacity
      className="flex-row  m-3 mx-2 bg-gray-100 p-2  shadow-xl w-[99%] rounded-md justify-between items-center  relative "
      
    >
      <View className="absolute top-1 left-1 bg-orange-400 z-10 p-[2px] px-1 rounded-sm">
        <Text className="text-xs text-white font-bold">{props.percentage}</Text>
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
          <Text className="text-center text-black  text-xs font-semibold">
            {props.title}
          </Text>
          <Text className="text-center text-gray-400 text-xs font-semibold">
            {props.location}
          </Text>
          <Text className="text-center text-gray-500  text-xs font-semibold ">
            {props.weight}
          </Text>
          <View className="flex-row gap-1 items-center">
            <Text className="text-center m-1 text-green-500 font-bold">
              {props.amount} <Text className="text-xs">Rwf</Text>
            </Text>
            <Text className="text-center text-gray-400 text-xs line-through font-semibold">
              {props.discounted}Rwf
            </Text>
          </View>
        </View>
      </View>
      <View className="pr-2  h-full w-[20%] flex-col ">
        <TouchableOpacity className="flex-row justify-center rounded gap-2 my-1 mb-4">
          <Icon name="clipboard-outline" color="red" size={15} />
          <Text className="text-red-500">Delete</Text>
        </TouchableOpacity>
        <View className="flex-row gap-1 text-lg bg-white h-[50px] self-end rounded justify-between align-center pr-1">
          <TouchableOpacity className="bg-gray-800 flex-col h-10 rounded items-center justify-center p-1 ">
            <Text onPress={countDown} className="text-2xl text-bold text-white px-1 self-center">-</Text>
          </TouchableOpacity>
          <Text className="text-2xl m-auto mx-1 text-center">{count}</Text>
          <TouchableOpacity onPress={countUp} className="bg-gray-800 flex-col h-10 rounded items-center justify-center p-1 ">
            <Text className="text-2xl text-white text-bold">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartCard;
