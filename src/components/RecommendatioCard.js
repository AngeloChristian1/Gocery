import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RecommendationCard = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex-row  m-3 mx-2 bg-gray-100 p-2  shadow-xl w-[95%] rounded-md justify-between items-center  relative"
      onPress={props.onPress}
    >
      <View className="absolute top-1 left-1 bg-orange-400 z-10 p-[2px] px-1 rounded-sm">
        <Text className="text-xs text-white font-bold">{props.percentage}</Text>
      </View>
      <View className="flex-col w-32  p-1 rounded-md mr-6 bg-gray-200 ">
        <Image source={props.source} className="w-24 h-24  object-contain  " style={{resizeMode:"contain"}} />
      </View>
      <View className=" w-full items-start justify-start gap-1">
       
        <Text className="text-center text-gray-400  text-xs font-semibold">
          Fresh {props.title} Premium
        </Text>
        <Text className="text-center text-gray-400 text-xs font-semibold">
          {props.location}
        </Text>
        <Text className="text-center text-gray-500  text-xs font-semibold ">
          {props.weight}
        </Text>
        <View className="flex-row gap-1 items-center">
        <Text className="text-center m-1 text-green-500 font-bold text-lg">
          {props.amount}
        </Text>
        <Text className="text-center text-gray-400 line-through font-semibold">
          {props.discounted}
        </Text>
      </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecommendationCard
