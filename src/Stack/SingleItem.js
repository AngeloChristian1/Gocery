import { View, Text, Image, TouchableOpacity, ToastAndroid, ActivityIndicator } from "react-native";
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import axios from "axios";
import GoBackButton from "../components/GoBackButton";
import { useNavigation } from "@react-navigation/native";


const SingleItem = ({route}) => {
  const item = route.params;
  const [grocery, setGrocery] = useState([]);
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { authToken } = useSelector((state) => state.auth);
  const cart = useSelector((state)=> state.cart.cart)
  const [isLoading, setIsLoading] = useState(true)

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
        setGrocery(response.data.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error in single item", error);
        showToast(error)
        setIsLoading(false)
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
        setIsLoading(false)
       
      })
      .catch((error) => {
        console.log("error adding to cart: ", error);
        showToast( error.response.data.message)
        setIsLoading(false)
      });
  };

let groc =  {"_id": "653b9132fce2386e57532305", "count": 5, "grocery": {"__v": 0, "_id": "6537de18b79326529c5c40da", "amount": "1 pack", "category": "65357e54706788961a777b8b", "description": "Type of bread that is commonly used for making sandwiches", "name": "Italian Bread", "picture": "https://res.cloudinary.com/dkakh1m7u/image/upload/v1698160151/uploads/x99jh0inn9scggwbbclu.png", "price": 1000}}
  const addItemToCart =(grocery)=>{
    dispatch(addToCart(grocery))
    showToast("item added to redux")
  }
  // addItemToCart(groc)
  return (
    <View className="flex-col  h-full bg-white p-2 pt-4 shadow-xl w-full rounded-md  items-center relative">
    <GoBackButton/>
    {isLoading ? (
      <View className=" w-full h-[100vh] bg-green-200 opacity-30   z-30 bg-opacity-30 backdrop-filter backdrop-blur-lg  top-0  absolute justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View></View>
    )}
      <View className="flex-row w-full justify-center items-center h-[35%]  p-1 rounded-md  shadow-inner " style={{backgroundColor: `${item.color}`}} >
        <Image
          source={{uri: grocery.picture}}
          style={{resizeMode:"contain"}}
          className="w-48 h-48 object-contain  "
        />
      </View>
      <View className=" w-full items-start justify-start gap-1 ">
        <View className="flex-row items-center gap-1">
          <Text className="text-center text-black  text-lg font-semibold" style={{fontFamily:"poppins_semibold"}}>
            {grocery.name}
          </Text>
          <View className=" bg-orange-400 p-[2px] px-1 rounded-sm">
            <Text className="text-xs text-white font-bold" style={{fontFamily:"poppins_semibold"}}>10%</Text>
          </View>
        </View>

        <View className="flex-row gap-1 items-center ">
          <Text className="text-center m-1 text-green-500 font-extrabold text-xl" style={{fontFamily:"poppins_semibold"}}>
            {grocery.price} Rwf
          </Text>
          <Text className="text-center m-1 text-gray-400 line-through font-semibold text-sm" style={{fontFamily:"poppins_semibold"}}>
            460 Rwf
          </Text>
        </View>
        <View className="line w-full border-b-[1px] border-gray-200 my-2"></View>

        <View className="flex-col gap-1 items-start justify-center mb-2">
          <Text className=" text-gray-400 text-xs font-semibold" style={{fontFamily:"poppins_semibold"}}>
            Amount
          </Text>
          <Text className=" text-gray-500  font-semibold" style={{fontFamily:"poppins_semibold"}}>
            {grocery.amount}
          </Text>
        </View>
        <View className="line w-full border-b-[1px] border-gray-200 my-2"></View>
        <View className="flex-col gap-1 items-start justify-center mb-2">
          <Text className=" text-gray-400 text-xs font-semibold" style={{fontFamily:"poppins_semibold"}}>
            Description
          </Text>
          <Text className=" text-gray-600  font-semibold px-3 my-1" style={{fontFamily:"poppins"}}>
            {item.description}
          </Text>
        </View>
      </View>
      <View className="w-full justify-self-end self-end my-3  rounded absolute bottom-0 left-2 mx-auto pb-10">
      <TouchableOpacity className="bg-primary rounded w-full p-2 py-4 items-center justify-self-end" 
      onPress={()=>{
       setIsLoading(true)
        handleAddToCart()
        // navigation.navigate("CartPage")
      }}>
      <Text className="font-bold text-white" style={{fontFamily:"poppins_semibold"}}> ADD TO CART</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleItem;
