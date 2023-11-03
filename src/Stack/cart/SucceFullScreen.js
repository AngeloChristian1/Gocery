import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SucceFullScreen = () => {
    const navigation = useNavigation()
  return (
    <View className="w-full h-full relative items-center justify-center bg-primary">


      <View className="flex-row mb-6 w-40 justify-between">
      <View className="flex-row ">
    <FontAwesome name="star" size={30} color="yellow" />
    <FontAwesome name="star" size={20} color="yellow" />
    <FontAwesome name="star" size={10} color="yellow" />
    </View>
    <View className="items-left justify-start flex-row-reverse">
    <FontAwesome name="star" size={30} color="yellow" />
    <FontAwesome name="star" size={20} color="yellow" />
    <FontAwesome name="star" size={10} color="yellow" />
   
    </View>
      </View>
    <MaterialIcons name="verified" size={40} color="white" />

      <Text style={{fontFamily:"poppins_semibold"}} className="text-white my-2 text-lg w-[80%] text-center"> Angelo, Your order has been successfull 
    <MaterialIcons name="celebration" size={24} color="orange" />
      
      </Text>
    
    <Text style={{fontFamily:"poppins"}} className="text-white my-2 text-l w-[80%] text-center"> Check out your order status in My Order about next steps information </Text>

    <TouchableOpacity onPress={()=>{navigation.navigate("TopBarOrderNavigator")}} className="bg-white p-2 w-[80%] flex-row justify-center rounded absolute bottom-1">
    <Text className="text-primary" style={{fontFamily:"poppins_semibold"}}>Track My Order</Text>
    </TouchableOpacity>
    </View>
  )
}

export default SucceFullScreen