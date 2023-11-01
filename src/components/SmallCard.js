import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const SmallCard = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={props.action}>
      <View className="flex-col  m-3 mx-2   shadow-lg w-20  rounded-md">
        <View className="flex-col w-20 p-1 rounded-md border-gray-200 border-[2px] justify-center items-center">
          <Image
          source={{ uri: props.ImageURL }}
            style={{resizeMode:"contain"}}
            className="w-16 h-16  object-contain  border-[1px]    rounded-lg "
          />
        </View>
        <Text className="text-center m-1 text-xs text-gray-500" style={{fontFamily:"poppins_semibold"}}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SmallCard;
