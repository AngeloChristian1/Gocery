import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AccountText = (props) => {
const navigation = useNavigation()
  return (
    <View>
      <View className="mx-2 mt-4 flex flex-row justify-between align-center">
        <TouchableOpacity  onPress={()=>{navigation.navigate("Promos")}}>
          <Text className="font-semibold text-lg ">{props.title}</Text>
          <Text className=" text-normal text-gray-500 mb-3">
            {props.subtitle}
          </Text>
        </TouchableOpacity >
        <View className="justify-center ">
          <AntDesign name="right" size={16} color="#08C25E" />
        </View>
      </View>
      <View className=" border-gray-300 border-[.5px] my-1 w-[95%] self-start ml-2 mt-[-2]"></View>
    </View>
  );
};

export default AccountText;