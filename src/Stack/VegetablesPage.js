import {
  View,
  Text,
  ScrollView,
  FlatList,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import DetailCard from "../components/DetailCard";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartReducer";
import { AntDesign } from "@expo/vector-icons";
import GoBackButton from "../components/GoBackButton";
import GoHomeButton from "../components/GoHomeButton";

import axios from "axios";

const VegetablesPage = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [groceries, setGroceries] = useState([]);
  const cart = useSelector((state) => state.cart.cart);
  console.log("cart:", cart);
  const { authToken } = useSelector((state) => state.auth);
  const category = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [countLoading, setCountLoading] = useState(false);
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
        console.log("CART DATA", response.data.data.items);
        setCartId(response.data.data);
        setIsLoading(false);
        cartData.map((item) => {
          dispatch(addToCart(item));
        });
      })
      .catch((error) => {
        console.log("error in cart page", error);
      });
  };

  const fetchGroceries = async () => {
    axios({
      method: "GET",
      url: `https://grocery-9znl.onrender.com/api/v1//grocery/bycategory/${category._id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        setGroceries(response.data.data);
        setIsLoading(false);
        setCountLoading(false);
        console.log("groceries.length", groceries.length);
      })
      .catch((error) => {
        console.log("error in vegetable page:", error);
        alert(error.response.data.message);
        setCountLoading(false);
        // setIsLoading(false)
      });
  };

  useEffect(() => {
    if (authToken) {
      fetchGroceries();
    }
  }, [authToken]);

  const handleAddToCart = async (grocery) => {
    axios({
      method: "POST",
      url: `https://grocery-9znl.onrender.com/api/v1/cart/add`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        groceryId: grocery._id,
        count: 1,
      },
    })
      .then((response) => {
        console.log(response.data);
        showToast(response.data.message);
        setIsLoading(false);
        setCountLoading(false);
      })
      .catch((error) => {
        console.log("error adding to cart: ", error);
        showToast(error.response.data.message);
        setCountLoading(false);
      });
  };

  // if (groceries.length == 0){
  //   return(
  //     <View className="items-center justify-center h-full gap-6">

  //     <AntDesign name="exclamationcircleo" size={40} color="red" />
  //       <Text
  //       className="font-semibold text-lg "
  //       style={{ fontFamily: "poppins_semibold" }}
  //     >
  //       No items in this category yet
  //     </Text>
  //       <Text
  //       className="font-semibold text-normal "
  //       style={{ fontFamily: "poppins" }}
  //     >
  //       To be Added soon
  //     </Text>
  //   </View>
  //   )
  // }

  return (
    <ScrollView className="h-[100vh] bg-white relative w-full pt-4">
      <GoBackButton />
      {countLoading ? (
        <View className=" w-full h-[100vh] bg-green-200 opacity-30   z-30 bg-opacity-30 backdrop-filter backdrop-blur-lg  top-0  absolute justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View></View>
      )}
      {!isLoading ? (
        
          <View className="flex flex-row flex-wrap bg-white  mx-1 pt-16">
            {groceries.map((item, index) => (
              <DetailCard
                key={index}
                onPress={() => {
                  navigation.navigate("SingleItem", item);
                }}
                item={item}
                link="SingleItem"
                percentage={item.discount ? `${item.discount}` : "10%"}
                source={item.picture}
                amount={item.price}
                discounted={item.discounted ? `${item.discounted}` : "100Rwf"}
                title={item.name}
                location="From Rwanda"
                weight="200gr"
                addCart={() => {
                  setCountLoading(true);
                  handleAddToCart(item);
                  fetchCart();
                }}
              />
            ))}
          </View>
          ):(
        <View className="h-[100vh] w-full flex items-center justify-center">
          <ActivityIndicator color="#FFB930" size="large" />
        </View>
      )}
    </ScrollView>
  );
};

export default VegetablesPage;

// const [productDetail, setProductDetail] = useState([
//   {
//     title: "Cabbage",
//     image: require("../../assets/images/cabbage.png"),
//     desrciption:
//       "Add a nutritious crunch to your meals with our fresh cabbage. Locally sourced and carefully selected for its texture and flavour, cabbage is a versatile and healthy ingredient that can be used in a variety of dishes, from salads and slaws to soups and stews. Packed with essential vitamins, minerals, and fibre, our cabbage is not only delicious but also great for supporting healthy digestion and immune function. Order now and experience the crisp, fresh taste of high-quality cabbage.",
//     discount: "10%",
//     price: "$0.39",
//     discounted: "$0.61",
//     quantity: "250gm",
//     rating: 4.7,
//     color: "#F7F6FF",
//     location: "From India",
//   },
//   {
//     title: "Spinach",
//     image: require("../../assets/images/spinach.png"),
//     desrciption:
//       "Msonge Organic Family Farm offers a wide range of products that are fresh, organic and picked when they are ripe and have the highest nutritional value. Please note all Msonge Organic Family Farm are delivered on the following days",
//     discount: "10%",
//     price: "$0.39",
//     discounted: "$0.42",
//     quantity: "200gr",
//     rating: 4.7,
//     color: "#ECFFF5",
//     location: "From Canada",
//   },
//   {
//     title: "Onion",
//     image: require("../../assets/images/onion.png"),
//     desrciption:
//       "Add a pop of color and flavor to your dishes with our 1kg pack of fresh, crisp red onions. Handpicked and carefully selected for their size and quality, these onions are a must-have in any kitchen. Whether you're making a salad, stir-fry, or soup, our onions are the perfect addition to enhance the taste and aroma of your dishes. Locally sourced and delivered fresh, our red onions are packed with essential nutrients and antioxidants",
//     discount: "10%",
//     price: "$0.41",
//     discounted: "$0.52",
//     quantity: "200gm",
//     location: "From Rwamagana",
//     rating: 4.7,
//     color: "#EAFFF7",
//   },
//   {
//     title: "Broccoli",
//     image: require("../../assets/images/broccoli.png"),
//     desrciption:
//       "Add a pop of color and flavor to your dishes with our 1kg pack of fresh, crisp red onions. Handpicked and carefully selected for their size and quality, these onions are a must-have in any kitchen. Whether you're making a salad, stir-fry, or soup, our onions are the perfect addition to enhance the taste and aroma of your dishes. Locally sourced and delivered fresh, our red onions are packed with essential nutrients and antioxidants",
//     discount: "10%",
//     price: "$0.41",
//     discounted: "$0.52",
//     quantity: "200gm",
//     location: "From Rwamagana",
//     rating: 4.7,
//     color: "#FEFEEB",
//   },
//   {
//     title: "Garlic",
//     image: require("../../assets/images/garlic.png"),
//     desrciption:
//       "Add a pop of color and flavor to your dishes with our 1kg pack of fresh, crisp red onions. Handpicked and carefully selected for their size and quality, these onions are a must-have in any kitchen. Whether you're making a salad, stir-fry, or soup, our onions are the perfect addition to enhance the taste and aroma of your dishes. Locally sourced and delivered fresh, our red onions are packed with essential nutrients and antioxidants",
//     discount: "10%",
//     price: "$0.41",
//     discounted: "$0.52",
//     quantity: "200gm",
//     location: "From Nyarutarama",
//     rating: 4.7,
//     color: "#FEFEEB",
//   },
//   {
//     title: "Pack Choi",
//     image: require("../../assets/images/pakchoi.png"),
//     desrciption:
//       "Add a pop of color and flavor to your dishes with our 1kg pack of fresh, crisp red onions. Handpicked and carefully selected for their size and quality, these onions are a must-have in any kitchen. Whether you're making a salad, stir-fry, or soup, our onions are the perfect addition to enhance the taste and aroma of your dishes. Locally sourced and delivered fresh, our red onions are packed with essential nutrients and antioxidants",
//     discount: "10%",
//     price: "$0.41",
//     discounted: "$0.52",
//     quantity: "200gm",
//     location: "From Rwamagana",
//     rating: 4.7,
//     color: "#FEFEEB",
//   },
//   {
//     title: "Carrots",
//     image: require("../../assets/images/carrots.png"),
//     desrciption:
//       "Add a pop of color and flavor to your dishes with our 1kg pack of fresh, crisp red onions. Handpicked and carefully selected for their size and quality, these onions are a must-have in any kitchen. Whether you're making a salad, stir-fry, or soup, our onions are the perfect addition to enhance the taste and aroma of your dishes. Locally sourced and delivered fresh, our red onions are packed with essential nutrients and antioxidants",
//     discount: "10%",
//     price: "$0.41",
//     discounted: "$0.52",
//     quantity: "200gm",
//     location: "From Rwamagana",
//     rating: 4.7,
//     color: "#FEFEEB",
//   },
//   {
//     title: "Spring Onion",
//     image: require("../../assets/images/springonions.png"),
//     desrciption:
//       "Add a pop of color and flavor to your dishes with our 1kg pack of fresh, crisp red onions. Handpicked and carefully selected for their size and quality, these onions are a must-have in any kitchen. Whether you're making a salad, stir-fry, or soup, our onions are the perfect addition to enhance the taste and aroma of your dishes. Locally sourced and delivered fresh, our red onions are packed with essential nutrients and antioxidants",
//     discount: "10%",
//     price: "$0.41",
//     discounted: "$0.52",
//     quantity: "200gm",
//     location: "From Rwamagana",
//     rating: 4.7,
//     color: "#FEFEEB",
//   },
// ]);
