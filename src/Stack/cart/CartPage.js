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
} from "../../redux/cartReducer";
import { cartTotalPriceSelector } from "../../redux/selectors";
import axios from "axios";
import { setItemAsync, getItemAsync } from "expo-secure-store";

const CartPage = () => {
  const navigation = useNavigation();
  const { authToken } = useSelector((state) => state.auth);
  const [storageCart, setStorageCart] = useState();
  const [cartData, setCartData] = useState([]);
  const [number, setNumber] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const totalPrice = useSelector(cartTotalPriceSelector);

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const AlertItem = () => {
    Alert.alert(
      "Are you sure you want to clear the cart?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => dispatch(clear()) },
      ],
      { cancelable: false }
    );
  };

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
    getTotal()
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
    getTotal()
  };
  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item));
    getTotal()
  };
  // Get one  items from database

  // Assuming your addToCart action and cartReducer are correctly defined
  let i = 0;

  const fetchCart = async () => {
    axios({
      method: "GET",
      url: `https://grocery-9znl.onrender.com/api/v1/cart/`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log(
          "response from cart___________: ",
          response.data.data.items.length
        );
        setCartData(response.data.data.items);
        showToast("items in cart");

       
        // response.data.data.items.map((item) => {
        //   console.log("items with map is ", item);
        //   addItemToCart(item); 
        // });

        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error in cart page", error);
        showToast(error.response.data.message);
      });
  };
  useEffect(() => {
    if (authToken) {
      fetchCart();
    }
  }, [authToken]);

  useEffect(() => {
    cartData.map((item) => {
      let i;
      // console.log("items with map", "at number", i++, " is ", item);
      addItemToCart(item);
    });
  },[]);

  // get items from secure storage

  const getCartFromStorage = async () => {
    let userCart = await getItemAsync("userCart");
    setStorageCart(JSON.parse(userCart));
  };
  useEffect(() => {
    getCartFromStorage();
  }, []);

 
  // update Item in cart

  const updateCartItem = async () => {
    axios({
      method: "PATCH",
      url: `https://grocery-9znl.onrender.com/api/v1/cart/updateItem/${props.itemId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        number,
      },
    })
      .then((response) => {
        showToast(response.data.message);
      })
      .catch((error) => {
        alert(error.response.data.message);
        showToast(error.response.data.message);
      });
  };

  // })
  
    const getTotal = ()=>{
      let total = 0;
    for (const item of cart) {
      total += item.price * item.count;
      setTotalAmount(total);

    }
    return(total)
    };
    
  useEffect(() => {
    getTotal()
  },[]);

  // getTotal()

  const countUp = async (n) => {
    setNumber(number + 1);
    n++;
    dispatch(incrementQuantity(item));
    await updateCartItem();
  };

  // decrementing item
  const countDown = async (n) => {
    if (number > 0) {
      n++;
      setNumber(number - 1);
      dispatch(decrementQuantity(item));
      await updateCartItem();
    }
    if (number === 0) {
      alert("item will be removed from list");
      showToast("item will be removed from list");
    }
  };


  const cart = useSelector((state) => state.cart.cart);

  return (
    <SafeAreaView>
      {!isLoading ? (
        <View className="flex-row flex-wrap justify-between  h-full bg-white font-bold relative pt-12 mb-4">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className="absolute top-5 left-5  p-[1px] rounded-md  "
          >
            <Feather name="arrow-left" size={24} color="#08C25E" />
          </TouchableOpacity>

          <TouchableOpacity className=" absolute justify-end flex-row items-end bg-white top-3 right-5" onPress={()=>{dispatch(clearCart())}}>
            <Text className="m-1 text-red-600 bg-gray-300 rounded-full px-2 py-1" style={{fontFamily:"poppins_semibold", }}> Clear Cart</Text>
          </TouchableOpacity>
          <FlatList
            className="bg-white w-full  flex-col-reverse"
            data={cart}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <CartCard
                onPress={() => {
                  navigation.navigate("SingleItem", item);
                }}
                item={item.grocery}
                link="SingleItem"
                percentage="10%"
                source={item.picture}
                amount={item.price * item.count}
                discounted="200"
                title={item.name}
                location="From Kigali"
                weight={item.amount}
                increment={() => countUp(item.count)}
                decrementt={() => countDown(item.count)}
                itemId={item._id}
                counter={item.count}
                count={item.count}
                // number= {number}
                removeItem={() => {
                  dispatch(removeFromCart(item));
                  showToast("item removed from cart");
                }}
                countDown={()=>{
                   decreaseQuantity(item)
                }}
                countUp={()=>{
                   increaseQuantity(item)
                }}
              />
            )}
          />
        </View>
      ) : (
        <ActivityIndicator className="h-full" color="" size="large" />
      )}
      <View className="bg-blue-500" style={{ position: "", bottom: 0 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            className="text-center text-semibold text-gray-500"
            style={{ fontFamily: "poppins_semibold" }}
          >
            Total
          </Text>
          <View className="flex-row" style={{ flexDirection: "column" }}>
            <Text
              className="text-center text-bold text-2xl"
              style={{ fontFamily: "poppins" }}
            >
              $1.87
            </Text>
            <Text
              className="text-center text-bold line-through text-gray-500"
              style={{ fontFamily: "poppins" }}
            >
              $2.43
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-primary w-[70%] py-2 rounded m-1 "
          style={{ backgroundColor: "#08C25E", borderRadius: 2, padding: 6 }}
        >
          <Text
            className="text-center text-bold"
            style={{
              fontWeight: 800,
              color: "white",
              textAlign: "center",
              fontFamily: "poppins_semibold",
            }}
          >
            PROCEED TO CHECKOUT
          </Text>
        </TouchableOpacity>
      </View>
      <View className=" gap-3 flex-col my-3 items-center justify-center absolute bottom-24 w-full shadow-inner justify-self-end align-middle self-center mt-4">
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
            {totalAmount}
          </Text>
        </View>
        <TouchableOpacity className="text-white bg-[#08C25E] rounded flex-row  py-[6px] w-[100%]  items-center justify-center gap-2">
          <Text
            className="text-white mb-2 font-bold"
            style={{ fontFamily: "poppins_semibold" }}
          >
            Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default CartPage;
 

// cart form DB
// const fetchCart = async () => {
//   axios({
//     method: "GET",
//     url: `https://grocery-9znl.onrender.com/api/v1/cart/`,
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },
//   })
//     .then((response) => {
//       console.log("response from cart: ", response.data.data.items);
//       setCartData(response.data.data.items);
//       setItemAsync("userCart", JSON.stringify(response.data.data.items));
//       showToast("items in cart")
//       setIsLoading(false);
//     })
//     .catch((error) => {
//       console.log("error in cart page", error);
//       showToast(error.response.data.message);
//     });
// };


//  // Delete item from cart
//  const deleteCartItem = async () => {
//   axios({
//     method: "DELETE",
//     url: `https://grocery-9znl.onrender.com/api/v1/cart/${item._id}`,
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },
//   })
//     .then((response) => {
//       // console.log("response from cart: ", response.data.data.items);
//       showToast("item deleted");
//       setCartData(response.data.data.items);
//     })
//     .catch((error) => {
//       // console.log("error in cart page", error);
//       alert(error.response.data.message);
//     });
// };
