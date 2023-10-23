import { View, Text } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const OrderCard = (props) => {
  return (
    <View className="p-3 m-1 flex-row justify-between">
      <View className="gap-2 flex-col">
        <View className="flex-row gap-2 items-center justify-between">
          <Text className="text-gray-500 mx-3">Order ID</Text>
          <Text className="text-lg font-semibold  text-gray-700">{props.orderId}</Text>
        </View>
        <View className="gap-2">
          <Text className="text-xs text-gray-500">Deliver to</Text>
          <View className="flex-row align-center mt-[-10] ">
            <Text className="text-lg text-black font-bold mr-3 ">{props.deliver}</Text>
            <FontAwesome name={props.locationIcon} size={24} color="#08C25E" />
          </View>
        </View>
      </View>
      <View className="gap-2 flex-col">
        <View className="flex-row gap-2 items-center justify-between">
        <FontAwesome name={props.statusIcon} size={20} color={props.statusIconColor} />
        <Text className="ml-2 ">{props.status}</Text>
        </View>
        <View className="gap-2">
        <Text className="text-xs text-gray-500">Total Payment</Text>
        <View className="flex-row align-center mt-[-10] ">
          <Text className="text-lg text-black font-bold mr-3 ">{props.payment}</Text>
          
        </View>
      </View>
      </View>
   
      <View className="absolute border-gray-300 bottom-0 w-[100%] border-[.5px] mx-3">
       
      </View>
    </View>
  );
};

export default OrderCard;


// <FontAwesome name="check-circle" size={20} color="#08C25E" />
// <FontAwesome name="dot-circle-o" size={20} color="#08C25E" />