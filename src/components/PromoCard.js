import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const PromoCard = (props) => {
  return (
    <View className="bg-white ">
      <View className=" bg-white">
        <View className="w-full bg-primary h-[200] justify-between items-center relative overflow-hidden">
          <View className="absolute right-0 h-[200px] w-[250px] bg-green-600 rotate-[-45deg] rounded-full translate-x-[70px] translate-y-0 "></View>

          <View className="w-full mx-auto flex-row justify-between px-5 h-[70%] self-center gap-4">
            <View className="w-[50%] h-[75%] items-center  justify-between gap-4">
              <Text className="font-extrabold text-2xl w-full text-white">
                {props.title}
              </Text>
              <TouchableOpacity className="bg-[#FFB82E] w-full px-3 py-2 my-2  rounded">
                <Text className="font-extrabold text-white text-center">
                  BUY NOW
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-[45%] h-[100%] object-contain  flex-row justify-center items-center">
              <Image
                source={props.image}
                style={{ resizeMode: "contain" }}
                className="w-[150px] h-[150px] object-contain rotate-[-30deg]  translate-y-7"
              />
            </View>
          </View>
        </View>
      </View>
      <View className=" p-2 px-3">
        <Text className="text-lg font-bold text-gray-800">{props.subtitle}</Text>
        <Text className=" text-gray-600">{props.availabitiy}</Text>
      </View>
      <View className=" border-gray-300 border-[.5px] my-3 w-[95%] self-start ml-2 mt-[-2]"></View>

    </View>
  );
};

export default PromoCard;
