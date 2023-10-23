import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DetailCard = (props) => {
  const navigation = useNavigation();
  return (
    <View>
    <TouchableOpacity
      onPress={props.onPress}
className="flex-col  m-3 mx-2 bg-gray-200 p-2  shadow-xl  px-7 rounded-md justify-center items-center relative"

    >
      <View className="absolute top-1 left-1 bg-orange-500 p-[2px] px-1 rounded-sm">
        <Text className="text-xs text-white font-bold">{props.percentage}</Text>
      </View>
      <View className="flex-col w-32  p-1 rounded-md ">
        <Image source={props.source} className="w-32 h-32  object-contain  " style={{resizeMode:"contain"}}/>
      </View>
      <View className=" w-full items-start justify-start gap-1">
        <View className="flex-row gap-1 items-center">
          <Text className="text-center m-1 text-green-500 font-bold text-lg">
            {props.amount}
          </Text>
          <Text className="text-center m-1 text-gray-400 line-through font-semibold">
            {props.discounted}
          </Text>
        </View>
        <Text className="text-center text-gray-400  text-xs font-semibold">
          {props.title}
        </Text>
        <Text className="text-center text-gray-400 text-xs font-semibold">
          {props.location}
        </Text>
        <Text className="text-center text-gray-500  text-xs font-semibold ">
          {props.weight}
        </Text>
      </View>
    </TouchableOpacity>
    </View>
  );
};

export default DetailCard;

