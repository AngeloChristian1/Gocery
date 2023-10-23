import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const SingleItem = ({route, navigation}) => {
  const item = route.params;
  return (
    <View className="flex-col  h-full bg-white p-2  shadow-xl w-full rounded-md  items-center relative">
      <View className="flex-row w-full justify-center items-center h-[35%]  p-1 rounded-md  shadow-inner " style={{backgroundColor: `${item.color}`}} >
        <Image
          source={item.image}
          style={{resizeMode:"contain"}}
          className="w-48 h-48 object-contain  "
        />
      </View>
      <View className=" w-full items-start justify-start gap-1 ">
        <View className="flex-row items-center gap-1">
          <Text className="text-center text-black  text-lg font-semibold">
            {item.title}
          </Text>
          <View className=" bg-orange-400 p-[2px] px-1 rounded-sm">
            <Text className="text-xs text-white font-bold">10%</Text>
          </View>
        </View>

        <View className="flex-row gap-1 items-center ">
          <Text className="text-center m-1 text-green-500 font-extrabold text-xl">
            $0.24
          </Text>
          <Text className="text-center m-1 text-gray-400 line-through font-normal text-lg">
            0.46
          </Text>
        </View>
        <View className="line w-full border-b-[1px] border-gray-200 my-2"></View>

        <View className="flex-col gap-1 items-start justify-center mb-2">
          <Text className=" text-gray-400 text-xs font-semibold">
            Amount
          </Text>
          <Text className=" text-gray-500  font-semibold ">
            200gr/ Pack
          </Text>
        </View>
        <View className="line w-full border-b-[1px] border-gray-200 my-2"></View>
        <View className="flex-col gap-1 items-start justify-center mb-2">
          <Text className=" text-gray-400 text-xs font-semibold">
            Description
          </Text>
          <Text className=" text-gray-500  font-semibold px-3 my-1">
            {item.desrciption}
          </Text>
        </View>
      </View>
      <View className="w-full justify-self-end self-end my-3  rounded absolute bottom-0 left-2 mx-auto">
      <TouchableOpacity className="bg-primary rounded w-full p-2 items-center justify-self-end">
      <Text className="font-bold text-white"> ADD TO CART</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleItem;
