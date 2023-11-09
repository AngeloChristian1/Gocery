import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, {useEffect, useState} from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const DetailCard = (props) => {
  const navigation = useNavigation();
  const [like, setLike] = useState({icon:"hearto", color:"orange"})

  const handleSetLike =()=>{
    if(like.icon == "hearto" ){
      setLike({
  icon:"heart",
  color:"orange"
})
    }
    else {
      setLike({icon:"hearto", color:"orange"})
    }

  }
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        className="flex-col  m-3 mx-2 border-[1px] border-gray-200 ring-2  p-2  px-3 pb-0 shadow-xl  rounded-md justify-center items-center relative"
        style={{ elevation: 5 }}
      >
        <View className="absolute top-1 left-1 bg-orange-500 p-[2px] px-1 rounded-sm z-10">
          <Text className="text-xs text-white font-bold" style={{fontFamily:"poppins_semibold"}}>
            {props.percentage}
          </Text>
        </View>
        <TouchableOpacity onPress={handleSetLike} className="absolute top-1 right-1 bg-white-500 p-[4px] border border-orange-400  rounded-full z-10">
        <AntDesign name={like.icon} size={15} color={like.color} />
       
        </TouchableOpacity>
        <View className="flex-col w-[140%]  p-1 rounded-md bg-re-300 items-center">
          <Image
            source={{ uri: props.source }}
            className="h-32 w-32  object-contain  "
            style={{ resizeMode: "contain" }}
          />
        </View>
        <View className=" w-full items-start justify-start gap-1">
          <View className="flex-row gap-1 items-center" style={{fontFamily:"poppins"}}>
            <Text className="text-center m-1 text-green-500 font-bold text-l">
              {props.amount} Rwf
            </Text>
            <Text className="text-center m-1 text-gray-400 line-through text-xs font-semibold" style={{fontFamily:"poppins"}}>
              {props.discounted}
            </Text>
          </View>
          <Text className="text-center text-gray-600  text-xs font-semibold" style={{fontFamily:"poppins_semibold"}}>
            {props.title}
          </Text>
          <Text className="text-center text-gray-500 text-xs font-semibold" style={{fontFamily:"poppins"}}>
            {props.location}
          </Text>
          <Text className="text-center text-gray-500  text-xs font-semibold " style={{fontFamily:"poppins"}}>
            {props.weight}
          </Text>
          <TouchableOpacity className="flex flex-row align-center gap-2 bg-primary w-0%] rounded justify-center px-3 mb-3 "
          onPress={props.addCart}
          >
            <Text className="text-xs mr-5 text-white font-semibold" style={{fontFamily:"poppins_semibold"}}>Add To cart</Text>

            <Ionicons name="cart" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DetailCard;
