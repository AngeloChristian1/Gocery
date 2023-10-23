import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const FirstScreen = () => {
    const navigation = useNavigation()
  return (
    <View className=" bg-primary h-full flex-col justify-around">
    <View className="items-center justify-center gap-6">
    <Image source={require('../../assets/icon.png')} className="w-[300px] h-[200px] "/>
    <Text className="font-semibold text-lg text-white "> Your Daily Needs</Text>
    
  </View>
  <View className="w-full items-center self-end  h-[30%]  justify-end justify-self-end" >
  <TouchableOpacity className="bg-white p-2 px-6 rounded w-[80%] items-center my-3" onPress={()=>{navigation.navigate("Login")}}>
    <Text className="text-primary font-semibold p-1">Login</Text>
    </TouchableOpacity>
  <TouchableOpacity className="bg-white p-2 px-6 rounded w-[80%] items-center my-3" onPress={()=>{navigation.navigate("Register")}}>
    <Text className="text-primary font-semibold p-1">Register</Text>
    </TouchableOpacity>
  <TouchableOpacity className=" p-2 px-6 border-white border rounded w-[80%] items-center my-3" onPress={()=>{navigation.navigate("Main")}}>
    <Text className="text-white font-semibold p-1">Continue As Guest</Text>
    </TouchableOpacity>
    
  </View>
  <Text className="text-xs w-[90%] text-center text-gray-800 absolute bottom-5 ml-4 font-semibold align-center justify-center">By Loging In you agree to our <Text className="text-white">Terms of use</Text> and <Text className="text-white">privacy policy</Text> </Text>
  
    </View>
  )
}

export default FirstScreen