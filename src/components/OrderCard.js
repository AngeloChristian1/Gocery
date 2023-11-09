import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const OrderCard = (props) => {
  return (
    <TouchableOpacity className="my-2" onPress={props.onPress}>
    <View className="p-3 px-0 m-1 flex-row justify-between">
      <View className="gap-2 flex-col">
        <View className="flex-row gap-2 items-center justify-between">
          <Text className="text-gray-500 text-xs mr-[-15px]" style={{fontFamily:"poppins_semibold" , fontSize:10}}>Order ID:   <Text className=" text-gray-700 overflow-hidden rounded-lg px-2" >{props.orderId}</Text></Text>
          
        </View>
        <View className="gap-2 flex-row items-center justify-start">
        <Text className="text-xs text-gray-500" style={{fontFamily:"poppins_semibold", fontSize:10}}>Trans. ID:  <Text className=" text-black  mr-3 " style={{fontFamily:"poppins"}}>{props.transaction}</Text> </Text>
      </View>
        <View className="gap-2 flex-row items-center">
          <Text className="text-xs text-gray-500" style={{fontFamily:"poppins_semibold" , fontSize:10}}>Date:</Text>
          <View className="flex-row align-center mt-[-10] items-center">
            <Text className="text-xs mr-3 " style={{fontFamily:"poppins_semibold" , fontSize:10}}>{props.date}</Text>
          </View>
        </View>
      </View>
      <View className="gap-2 flex-col">
        <View className="flex-row gap-2 items-center justify-end mr-3 ">
        <FontAwesome name={props.statusIcon} size={15} color={props.statusIconColor} />
        <Text className="ml-2 " style={{fontFamily:"poppins", fontSize:10}}>{props.status}</Text>
        </View>
        <View className="gap-2 flex-row items-center">
        <Text className="text-xs text-gray-500" style={{fontFamily:"poppins_semibold", fontSize:10}}>Total Payment:</Text>
        <View className="flex-row align-center items-center ">
          <Text className="text-l text-black  mr-3 " style={{fontFamily:"poppins_semibold", fontSize:10}}>{props.payment}</Text>   
        </View>
      </View>
      <View className="gap-2 flex-row items-center">
      <Text className="text-xs text-gray-500" style={{fontFamily:"poppins_semibold", fontSize:10}}>Deliver to:</Text>
      <View className="flex-row align-center mt-[-10] items-center">
        <Text className="text-xs mr-3 " style={{fontFamily:"poppins_semibold", fontSize:10}}>{props.deliver}</Text>
      </View>
    </View>
        
      </View>
   
      <View className="absolute border-gray-400 bottom-0 w-[100%] border-[.5px] self-center"></View>
    </View>
    </TouchableOpacity>
  );
};

export default OrderCard;


// <FontAwesome name="check-circle" size={20} color="#08C25E" />
// <FontAwesome name="dot-circle-o" size={20} color="#08C25E" />