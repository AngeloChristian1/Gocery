import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import CartCard from "../../components/CartCard";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  decreaseQuantity,
  incrementQuantityAsync,
  decrementQuantityAsync,
} from "../../redux/cartReducer";
import axios from "axios";
import { setItemAsync, getItemAsync } from "expo-secure-store";
import { cartTotalPriceSelector } from "../../redux/selectors";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { setTotalItems } from "../../redux/totalReducer";
import GoBackButton from "../../components/GoBackButton";

const CartPage = (props) => {
  const isFocused = useIsFocused();
  const Amount = useSelector(cartTotalPriceSelector);
  const navigation = useNavigation();
  const { authToken } = useSelector((state) => state.auth);
  const [storageCart, setStorageCart] = useState();
  const [cartData, setCartData] = useState([]);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [cartId, setCartId] = useState("");
  const [price, setPrice] = useState(0);
  const [countLoading, setCountLoading] = useState(false);

  const totalPrice = useSelector(cartTotalPriceSelector);
  // const totalItems = useSelector(totalPrice);

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
    getTotal();
  };
  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
    getTotal();
  };
  // Get one  items from database

  // Assuming your addToCart action and cartReducer are correctly defined

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
        console.log("CART DATA", response.data.data.items);
        showToast("items in cart");
        setCartId(response.data.data);
        setIsLoading(false);
        setCountLoading(false);
        cartData.map((item) => {
          dispatch(addItemToCart(item));
          setError(false)
        });
      })
      .catch((error) => {
        console.log("error in cart page fetch cart",error.response.data.message);
        showToast(error?.response.data.message);
        setError(true);
        setCartData(null)
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      // Fetch cart data or perform any other actions when the screen is focused.
      fetchCart(); 
    }, [])
  );

  useEffect(() => {
    fetchCart();
  }, [isFocused, count, isLoading]);

  const updateCartItemBelow = async (item) => {
    if(item.count <= 1){
      showToast("Cant decrement item to 0");
      setCountLoading(false);
    }
    if (item.count > 1) {
      axios({
        method: "PATCH",
        url: `https://grocery-9znl.onrender.com/api/v1/cart/updateItem/${item.grocery._id}`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          count: item.count - 1,
        },
      })
        .then((response) => {
          fetchCart();
          console.log("response from cartCard: ", response.data);
          showToast(response.data.message);
          setCount(response.data.items);
          
        })
        .catch((error) => {
          console.log("error in cart page", error);
          alert(error.response.data.message);
          showToast(error.response.data.message);
        });
    }
  };

  const incrementAmountCards = (itemId) => {
    const index = cartData.findIndex(
      (cartItem) => cartItem.grocery._id == itemId
    );
    setIsLoading(true);

    axios({
      method: "PATCH",
      url: `https://grocery-9znl.onrender.com/api/v1/cart/updateItem/${itemId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        count: cartData[index].count + 1,
      },
    })
      .then((response) => {
        console.log("response from cartCard: ", response.data);
        showToast(response.data.message);
        setCount(count + 1);
        const updatedCartData = [...userCards];
        updatedCartData = response.data.data.item;
        setCartData(updatedCartData);
      })
      .catch((error) => {
        console.log("error in cart page", error);
        alert(error.response.data.message);
        showToast(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateCartItem = async (item) => {
    axios({
      method: "PATCH",
      url: `https://grocery-9znl.onrender.com/api/v1/cart/updateItem/${item.grocery._id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        count: item.count + 1,
      },
    })
      .then((response) => {
        fetchCart();
        console.log("response from cartCard: ", response.data);
        showToast( "error: ",  response.data.message);
      })
      .catch((error) => {
        console.log("error in cart page: __", error);
        alert(error.response.data.message);
        showToast("error: ",error.response.data.message);
      });
  };

  const calculateTotalPrice = (cartData) => {
    return cartData?.reduce(
      (total, item) => total + item.count * item.grocery.price,
      0
    );
  };

  useEffect(() => {
    const newTotalAmount = calculateTotalPrice(cartData);
    setTotalAmount(newTotalAmount);
  }, [cartData]);

  useFocusEffect(React.useCallback(() => {}, []));

  const cart = useSelector((state) => state.cart.cart);


  return (
    <SafeAreaView className="h-full w-full bg-white">
    <GoBackButton/>
      {!isLoading ? (
        (!cartData ) ? (
          <View className="items-center justify-center h-full gap-6">
            <Image source={require("../../../assets/images/NoItems.gif")} className="w-[60%] h-[30%]"/>
            <Text
              className="font-semibold text-normal "
              style={{ fontFamily: "poppins" }}
            >
              You don't have items in cart yet?
            </Text>
            <TouchableOpacity
              className="bg-primary p-2 px-6 rounded"
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text
                className="text-white font-semibold"
                style={{ fontFamily: "poppins_semibold" }}
              >
                Shop Now
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
          <View className="flex-row flex-wrap justify-between  h-full bg-white font-bold relative pt-12 mb-4">
          
            <TouchableOpacity
              className=" absolute justify-end flex-row items-end bg-white top-3 right-5 hidden"
              onPress={() => {
                dispatch(clearCart());
              }}
            >
              <Text
                className="m-1 text-red-600 bg-gray-300 rounded-full px-2 py-1"
                style={{ fontFamily: "poppins_semibold" }}
              >
                Clear Cart
              </Text>
            </TouchableOpacity>
            {countLoading ? (
              <View className=" w-full h-full bg-green-200 opacity-30   z-30 bg-opacity-30 backdrop-filter backdrop-blur-lg  top-0  absolute justify-center items-center">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <View></View>
            )}
            
            <FlatList
            scrollEnabled
              className="bg-white w-full  flex-col-reverse"
              data={cartData}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity className="flex-row  m-3 mx-2 bg-gray-100 p-2  shadow-xl w-[99%] rounded-md justify-between items-center  relative ">
                  <View className="absolute top-1 left-1 bg-orange-400 z-10 p-[2px] px-1 rounded-sm">
                    <Text
                      className="text-xs text-white font-bold"
                      style={{ fontFamily: "poppins_semibold" }}
                    >
                      10%
                    </Text>
                  </View>
                  <View className="flex-row  w-[70%] justify-start justify-items-start">
                    <View className="flex-col w-24  p-1 rounded-md mr-6 bg-white justify-center items-center ">
                      <Image
                        style={{ resizeMode: "contain" }}
                        source={{ uri: item.grocery.picture }}
                        className="w-20 h-20  object-contain  "
                      />
                    </View>
                    <View className=" w-[60%]  items-start justify-start gap-1">
                      <Text
                        className="text-center text-black  text-xs font-semibold"
                        style={{ fontFamily: "poppins_semibold" }}
                      >
                        {item.grocery.name}
                      </Text>
                      <Text
                        className="text-center text-gray-500 text-xs font-semibold"
                        style={{ fontFamily: "poppins" }}
                      >
                        From Rwanda
                      </Text>
                      <Text
                        className="text-center text-gray-500  text-xs font-semibold "
                        style={{ fontFamily: "poppins_semibold" }}
                      >
                        {item.grocery.amount}
                      </Text>
                      <View className="flex-row gap-1 items-center">
                        <Text
                          className="text-center m-1 text-green-500 font-bold"
                          style={{ fontFamily: "poppins_semibold" }}
                        >
                          {item.grocery.price * item.count}
                          <Text className="text-xs">Rwf</Text>
                        </Text>
                        <Text
                          className="text-center text-gray-400 text-xs line-through font-semibold"
                          style={{ fontFamily: "poppins_semibold" }}
                        >
                          {(item.grocery.price / 300) * 30}Rwf
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="pr-2  h-full w-[20%] flex-col ">
                    <TouchableOpacity className="flex-row justify-center rounded gap-2 my-1 mb-4">
                      <Icon name="clipboard-outline" color="red" size={15} />
                      <Text
                        className="text-red-500"
                        style={{ fontFamily: "poppins_semibold" }}
                      >
                        Delete
                      </Text>
                    </TouchableOpacity>
                    <View className="flex-row gap-1 text-lg bg-white h-[50px] self-end rounded justify-between align-center pr-1 ]">
                      <TouchableOpacity
                        onPress={() => {
                          setCountLoading(true);
                          updateCartItemBelow(item);
                          
                        }}
                        className="bg-gray-800 flex-col h-10 rounded items-center justify-center p-1 "
                      >
                        <Text
                          className="text-2xl text-bold text-white  self-center"
                          style={{ fontFamily: "poppins" }}
                        >
                          -
                        </Text>
                      </TouchableOpacity>
                      
                        <Text
                          className="text-2xl m-auto mx-1 text-center  h-full pt-1"
                          style={{ fontFamily: "poppins_semibold" }}
                        >
                          {item.count}
                        </Text>
                      

                      <TouchableOpacity
                        onPress={() => {
                          setCountLoading(true);
                          updateCartItem(item);
                          
                        }}
                        className="bg-gray-800 flex-col h-10 rounded items-center justify-center p-1 "
                      >
                        <Text
                          className="text-2xl text-white text-bold"
                          style={{ fontFamily: "poppins" }}
                        >
                          +
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
            
          </View>
          <View className=" gap-3 flex-col my-3 items-center justify-center absolute bottom-6 mx-auto w-full shadow-inner justify-self-end align-middle self-center mt-4">
          <View className="flex-row justify-center gap-2 w-[50%] items-center">
            <Text
              className="text-gray-700 "
              style={{ fontFamily: "poppins_semibold" }}
            >
              Total Amount :
            </Text>
  
            <Text
              className="text-black font-bold text-lg "
              style={{ fontFamily: "poppins_semibold" }}
            >
              ${totalAmount}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Checkout", {
                totalAmount: totalAmount,
                cartId: cartId,
              });
            }}
            className="text-white bg-[#08C25E] rounded flex-row  py-[6px] w-[100%]  items-center justify-center gap-2"
          >
            <Text
              className="text-white mb-2 font-bold"
              style={{ fontFamily: "poppins_semibold" }}
            >
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
          </View>
        )
      ) : (
        <ActivityIndicator className="h-full w-full bg-white" color="green" size="large" />
      )}

     
      
    </SafeAreaView>
  );
};
export default CartPage;
