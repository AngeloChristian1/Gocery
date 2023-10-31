import { View, Text, Image, TouchableOpacity, ToastAndroid } from "react-native";
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import axios from "axios";


const SingleItem = ({route, navigation}) => {
  const item = route.params;
  const [grocery, setGrocery] = useState([]);
  // console.log("Single item",item)
  const dispatch = useDispatch()
  const { authToken } = useSelector((state) => state.auth);
  const cart = useSelector((state)=> state.cart.cart)
  // console.log("cart from single item:", cart)
  // console.log("grocery item: ",item)


  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const fetchGrocery = async () => {
    axios({
      method: "GET",
      url: `https://grocery-9znl.onrender.com/api/v1/grocery/${item._id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        // console.log("response from single item: ", response.data);
        setGrocery(response.data.data);
      })
      .catch((error) => {
        console.log("error in single item", error);
        alert(error.response.data.message);
      });
  };

  useEffect(() => {
    if (authToken) {
      fetchGrocery();

    }
  }, [authToken]);

  // function of adding to cart on click

  
  const handleAddToCart = async () => {
    axios({
      method: "POST",
      url: `https://grocery-9znl.onrender.com/api/v1/cart/add`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        groceryId:grocery._id,
        count:1,
      },
    })
      .then((response) => {
        console.log(response.data);
        showToast(response.data.message)
        // dispatch(setAuthProfile(response.data.user));
        // dispatch(setAuthToken(response.data.access_token));
        // dispatch(setAuthStatus(true));
        // setItemAsync("authToken", response.data.access_token);
        // setItemAsync("authProfile", JSON.stringify(response.data.user));
      })
      .catch((error) => {
        console.log("error adding to cart: ", error);
        showToast( error.response.data.message)
      });
  };


  const addItemToCart =(grocery)=>{
    dispatch(addToCart(grocery))
  }
  return (
    <View className="flex-col  h-full bg-white p-2  shadow-xl w-full rounded-md  items-center relative">
      <View className="flex-row w-full justify-center items-center h-[35%]  p-1 rounded-md  shadow-inner " style={{backgroundColor: `${item.color}`}} >
        <Image
          source={{uri: grocery.picture}}
          style={{resizeMode:"contain"}}
          className="w-48 h-48 object-contain  "
        />
      </View>
      <View className=" w-full items-start justify-start gap-1 ">
        <View className="flex-row items-center gap-1">
          <Text className="text-center text-black  text-lg font-semibold">
            {grocery.name}
          </Text>
          <View className=" bg-orange-400 p-[2px] px-1 rounded-sm">
            <Text className="text-xs text-white font-bold">10%</Text>
          </View>
        </View>

        <View className="flex-row gap-1 items-center ">
          <Text className="text-center m-1 text-green-500 font-extrabold text-xl">
            {grocery.price} Rwf
          </Text>
          <Text className="text-center m-1 text-gray-400 line-through font-semibold text-sm">
            460 Rwf
          </Text>
        </View>
        <View className="line w-full border-b-[1px] border-gray-200 my-2"></View>

        <View className="flex-col gap-1 items-start justify-center mb-2">
          <Text className=" text-gray-400 text-xs font-semibold">
            Amount
          </Text>
          <Text className=" text-gray-500  font-semibold ">
            {grocery.amount}
          </Text>
        </View>
        <View className="line w-full border-b-[1px] border-gray-200 my-2"></View>
        <View className="flex-col gap-1 items-start justify-center mb-2">
          <Text className=" text-gray-400 text-xs font-semibold">
            Description
          </Text>
          <Text className=" text-gray-500  font-semibold px-3 my-1">
            {item.description}
          </Text>
        </View>
      </View>
      <View className="w-full justify-self-end self-end my-3  rounded absolute bottom-0 left-2 mx-auto">
      <TouchableOpacity className="bg-primary rounded w-full p-2 items-center justify-self-end" 
      onPress={handleAddToCart}>
      <Text className="font-bold text-white"> ADD TO CART</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleItem;
