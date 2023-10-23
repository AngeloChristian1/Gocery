import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import DetailCard from "../components/DetailCard";
import { useNavigation } from "@react-navigation/native";

const FruitsPage = () => {
  const images = [
    require("../../assets/images/spinach.png"),
    require("../../assets/images/cabbage.png"),
  ];
  const navigation = useNavigation();
  const [productDetail, setProductDetail] = useState([
    {
      title: "Apple",
      image: require("../../assets/images/apple.png"),
      desrciption:
        "Ceres is the best 100 percent pure fruit juice you can buy - wholesome, earthy and natural, with no added cane sugar, colorants or preservatives - The pure goodness of nature from the valley of ceres. It's filled with all the vitamins and minerals found in fresh fruit.",
      discount: "10%",
      price: "$0.39",
      discounted: "$0.61",
      quantity: "250gm",
      rating: 4.7,
      color: "#F7F6FF",
      location: "From India",
    },
    {
      title: "Banana",
      image: require("../../assets/images/banana.png"),
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
      title: "Strawberry",
      image: require("../../assets/images/strawberry.png"),
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
      title: "Water Mellon",
      image: require("../../assets/images/watermellon.png"),
      desrciption:
        "Quench your thirst and satisfy your sweet tooth with our fresh watermelon. Locally sourced and carefully selected for their ripeness and flavour, Watermelons are bursting with juicy goodness and essential nutrients. Whether you're enjoying a slice on a hot summer day or adding them to a fruit salad, our watermelons are the perfect choice for anyone who loves the taste of ripe, juicy fruit. Order now and experience the refreshing, natural taste of our high-quality watermelon.",
      discount: "10%",
      price: "$0.41",
      discounted: "$0.52",
      quantity: "200gm",
      location: "From Rwamagana",
      rating: 4.7,
      color: "#FEFEEB",
    },
    {
      title: "Carrots",
      image: require("../../assets/images/carrots.png"),
      desrciption:
        "Quench your thirst and satisfy your sweet tooth with our fresh watermelon. Locally sourced and carefully selected for their ripeness and flavour, Watermelons are bursting with juicy goodness and essential nutrients. Whether you're enjoying a slice on a hot summer day or adding them to a fruit salad, our watermelons are the perfect choice for anyone who loves the taste of ripe, juicy fruit. Order now and experience the refreshing, natural taste of our high-quality watermelon.",
      discount: "10%",
      price: "$0.41",
      discounted: "$0.52",
      quantity: "200gm",
      location: "From Rwamagana",
      rating: 4.7,
      color: "#FEFEEB",
    },
    {
      title: "Tomatoes",
      image: require("../../assets/images/tomatoes.png"),
      desrciption:
        "Quench your thirst and satisfy your sweet tooth with our fresh watermelon. Locally sourced and carefully selected for their ripeness and flavour, Watermelons are bursting with juicy goodness and essential nutrients. Whether you're enjoying a slice on a hot summer day or adding them to a fruit salad, our watermelons are the perfect choice for anyone who loves the taste of ripe, juicy fruit. Order now and experience the refreshing, natural taste of our high-quality watermelon.",
      discount: "10%",
      price: "$0.41",
      discounted: "$0.52",
      quantity: "200gm",
      location: "From Rwamagana",
      rating: 4.7,
      color: "#FEFEEB",
    },
  ]);
  return (

     
    <ScrollView >
    <View className=" flex flex-row flex-wrap h-[100vh] bg-white justify-center ">
      {productDetail.map((item) => (
        <DetailCard
          key={item.title}
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
      ))}
      </View>
    </ScrollView>  
    
  );
};

export default FruitsPage;
