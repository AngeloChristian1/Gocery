import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, {useState} from "react";
import { useNavigation } from "@react-navigation/native";

import Icon from "react-native-vector-icons/Ionicons";

const CartCard = (props) => {
    const [count, setCount] = useState(1)
    const countUp = ()=>{
        
            setCount(count+1)
        
    }
    const countDown = ()=>{
        if(count == 1){
            setCount(1)
        }
        setCount(count-1)
    }
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex-row  m-3 mx-2 bg-gray-100 p-2  shadow-xl w-[99%] rounded-md justify-between items-center  relative "
      
    >
      <View className="absolute top-1 left-1 bg-orange-400 z-10 p-[2px] px-1 rounded-sm">
        <Text className="text-xs text-white font-bold">{props.percentage}</Text>
      </View>
      <View className="flex-row  w-[70%] justify-start justify-items-start">
        <View className="flex-col w-24  p-1 rounded-md mr-6 bg-gray-200 ">
          <Image
          style={{resizeMode:"contain"}}
            source={props.source}
            className="w-20 h-20  object-contain  "
          />
        </View>
        <View className=" w-[60%]  items-start justify-start gap-1">
          <Text className="text-center text-black  text-xs font-semibold">
            {props.title}
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
      </View>
      <View className="pr-2  h-full w-[20%] flex-col ">
        <TouchableOpacity className="flex-row justify-center rounded gap-2 my-1 mb-4">
          <Icon name="clipboard-outline" color="red" size={15} />
          <Text className="text-red-500">Delete</Text>
        </TouchableOpacity>
        <View className="flex-row gap-1 text-lg bg-white h-[50px] self-end rounded justify-between align-center pr-1">
          <TouchableOpacity className="bg-gray-800 flex-col h-10 rounded items-center justify-center p-1 ">
            <Text onPress={countDown} className="text-2xl text-bold text-white px-1 self-center">-</Text>
          </TouchableOpacity>
          <Text className="text-2xl m-auto mx-1 text-center">{count}</Text>
          <TouchableOpacity onPress={countUp} className="bg-gray-800 flex-col h-10 rounded items-center justify-center p-1 ">
            <Text className="text-2xl text-white text-bold">+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartCard;
