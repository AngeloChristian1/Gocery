import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import DetailCard from "../components/DetailCard";
import RecommendationCard from "../components/RecommendatioCard";
import { useNavigation } from "@react-navigation/native";

const RecommendatioPage = () => {
  const images = [
    require("../../assets/images/spinach.png"),
    require("../../assets/images/cabbage.png"),
  ];
  const navigation = useNavigation();
  const [productDetail, setProductDetail] = useState([
    {
      title: "Cabbage",
      image: require("../../assets/images/cabbage.png"),
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
      image: require("../../assets/images/spinach.png"),
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
      image: require("../../assets/images/onion.png"),
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
    {
      title: "Broccoli",
      image: require("../../assets/images/broccoli.png"),
      desrciption:
        "Add a pop of color and flavor to your dishes with our 1kg pack of fresh, crisp red onions. Handpicked and carefully selected for their size and quality, these onions are a must-have in any kitchen. Whether you're making a salad, stir-fry, or soup, our onions are the perfect addition to enhance the taste and aroma of your dishes. Locally sourced and delivered fresh, our red onions are packed with essential nutrients and antioxidants",
      discount: "10%",
      price: "$0.41",
      discounted: "$0.52",
      quantity: "200gm",
      location: "From Kacyiru",
      rating: 4.7,
      color: "#FEFEEB",
    },
    {
      title: "Green Pepper",
      image: require("../../assets/images/greenpepper.png"),
      desrciption:
        "Add a pop of color and flavor to your dishes with our 1kg pack of fresh, crisp red onions. Handpicked and carefully selected for their size and quality, these onions are a must-have in any kitchen. Whether you're making a salad, stir-fry, or soup, our onions are the perfect addition to enhance the taste and aroma of your dishes. Locally sourced and delivered fresh, our red onions are packed with essential nutrients and antioxidants",
      discount: "10%",
      price: "$0.41",
      discounted: "$0.52",
      quantity: "200gm",
      location: "From Ruhango",
      rating: 4.7,
      color: "#FEFEEB",
    },
    {
      title: "Garlic",
      image: require("../../assets/images/garlic.png"),
      desrciption:
        "Add a pop of color and flavor to your dishes with our 1kg pack of fresh, crisp red onions. Handpicked and carefully selected for their size and quality, these onions are a must-have in any kitchen. Whether you're making a salad, stir-fry, or soup, our onions are the perfect addition to enhance the taste and aroma of your dishes. Locally sourced and delivered fresh, our red onions are packed with essential nutrients and antioxidants",
      discount: "10%",
      price: "$0.41",
      discounted: "$0.52",
      quantity: "200gm",
      location: "From DRC",
      rating: 4.7,
      color: "#FEFEEB",
    },
  ]);
  return (
  
      <View className="flex-row flex-wrap justify-between  h-full bg-white" >
        <FlatList
          className="bg-white w-full h-full flex-col-reverse"
          data={productDetail}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <RecommendationCard
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

  );
};

export default RecommendatioPage;
