import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const DetailCard = (props) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        className="flex-col  m-3 mx-2 border-[1px] border-gray-200 ring-2  p-2  shadow-xl  px-1 rounded-md justify-center items-center relative"
        style={{ elevation: 5 }}
      >
        <View className="absolute top-1 left-1 bg-orange-500 p-[2px] px-1 rounded-sm z-10">
          <Text className="text-xs text-white font-bold">
            {props.percentage}
          </Text>
        </View>
        <View className="flex-col w-[140%]  p-1 rounded-md bg-re-300 items-center">
          <Image
            source={{ uri: props.source }}
            className="h-32 w-32  object-contain  "
            style={{ resizeMode: "contain" }}
          />
        </View>
        <View className=" w-full items-start justify-start gap-1">
          <View className="flex-row gap-1 items-center">
            <Text className="text-center m-1 text-green-500 font-bold text-l">
              {props.amount} Rwf
            </Text>
            <Text className="text-center m-1 text-gray-400 line-through text-xs font-semibold">
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
          <TouchableOpacity className="flex flex-row align-center gap-2 bg-primary w-[110%]px-2 rounded justify-center px-1"
          onPress={props.addCart}
          >
            <Text className="text-xs mr-5">Add To cart</Text>

            <Ionicons name="cart" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DetailCard;
