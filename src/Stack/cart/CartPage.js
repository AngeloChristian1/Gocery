import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CartCard from "../../components/CartCard";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableHighlight } from "react-native-gesture-handler";
import { AntDesign, Feather } from "@expo/vector-icons";


const CartPage = () => {
  const images = [
    require("../../../assets/images/spinach.png"),
    require("../../../assets/images/cabbage.png"),
    require("../../../assets/images/apple.png"),
  ];
  const navigation = useNavigation();
  const [productDetail, setProductDetail] = useState([
    {
      title: "Cabbage",
      image: require("../../../assets/images/cabbage.png"),
      desrciption:
        "Add a nutritious crunch to your meals with our fresh cabbage. Locally sourced and carefully selected for its texture and flavour, cabbage is a versatile and healthy ingredient that can be used in a variety of dishes, from salads and slaws to soups and stews. Packed with essential vitamins, minerals, and fibre, our cabbage is not only delicious but also great for supporting healthy digestion and immune function. Order now and experience the crisp, fresh taste of high-quality cabbage.",
      discount: "10%",
      price: "$0.39",
      discounted: "$0.61",
      quantity: "250gm",
      rating: 4.7,
      color: "#F7F6FF",
      location: "From India",
    },
    {
      title: "Spinach",
      image: require("../../../assets/images/spinach.png"),
      desrciption:
        "Msonge Organic Family Farm offers a wide range of products that are fresh, organic and picked when they are ripe and have the highest nutritional value. Please note all Msonge Organic Family Farm are delivered on the following days",
      discount: "10%",
      price: "$0.39",
      discounted: "$0.42",
      quantity: "200gr",
      rating: 4.7,
      color: "#ECFFF5",
      location: "From Canada",
    },
    {
      title: "Onion",
      image: require("../../../assets/images/onion.png"),
      desrciption:
        "Add a pop of color and flavor to your dishes with our 1kg pack of fresh, crisp red onions. Handpicked and carefully selected for their size and quality, these onions are a must-have in any kitchen. Whether you're making a salad, stir-fry, or soup, our onions are the perfect addition to enhance the taste and aroma of your dishes. Locally sourced and delivered fresh, our red onions are packed with essential nutrients and antioxidants",
      discount: "10%",
      price: "$0.41",
      discounted: "$0.52",
      quantity: "200gm",
      location: "From Rwamagana",
      rating: 4.7,
      color: "#EAFFF7",
    },
  ]);
  return (
    <SafeAreaView>
      <View className="flex-row flex-wrap justify-between  h-full bg-white  relative pt-12">
      <TouchableOpacity onPress={()=>{navigation.goBack()}} className="absolute top-5 left-5  p-[1px] rounded-md border-primary border-[.5px] ">
      <Feather name="arrow-left" size={20} color="green" />
      </TouchableOpacity>
        <FlatList
          className="bg-white w-full  flex-col-reverse"
          data={productDetail}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <CartCard
              onPress={() => {
                navigation.navigate("SingleItem", item);
              }}
              item={item}
              link="SingleItem"
              percentage={item.discount}
              source={item.image}
              amount={item.price}
              discounted={item.discounted}
              title={item.title}
              location={item.location}
              weight="200gr"
            />
          )}
        />
      </View>
      <View className="bg-blue-500" style={{ position: "", bottom: 0 }}>
        <View style={{ flexDirection: "row" }}>
          <Text className="text-center text-semibold text-gray-500">Total</Text>
          <View className="flex-row" style={{ flexDirection: "column" }}>
            <Text className="text-center text-bold text-2xl">$1.87</Text>
            <Text className="text-center text-bold line-through text-gray-500">
              $2.43
            </Text>
          </View>
        </View>
        <TouchableOpacity
          className="bg-primary w-full py-2 rounded m-1"
          style={{ backgroundColor: "#08C25E", borderRadius: 2, padding: 6 }}
        >
          <Text
            className="text-center text-bold"
            style={{
              fontWeight: 800,
              color: "white",
              textAlign: "center",
            }}
          >
            PROCEED TO CHECKOUT
          </Text>
        </TouchableOpacity>
      </View>
      <View className=" gap-3 flex-col my-3 items-center justify-center absolute bottom-24 justify-self-end align-middle self-center">
     <View className="flex-row justify-between w-[50%] items-center gap-1">
     <Text className="text-gray-700 ">Total Amount:</Text>
     <Text className="text-black font-bold text-lg ">$24.56</Text>
     </View>
      <TouchableOpacity
        className="text-white bg-[#08C25E] rounded flex-row  py-[6px] w-[100%]  items-center justify-center gap-2"
      >
        <Text className="text-white mb-2 font-bold">Checkout</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

export default CartPage;
