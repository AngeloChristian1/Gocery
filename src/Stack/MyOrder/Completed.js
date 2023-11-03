import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Completed = () => {
    const navigation= useNavigation()
  return (
    <View className="items-center justify-center h-full gap-6">
      <Image source={require('../../../assets/images/backet.png')}/>
      <Text className="font-semibold text-normal " style={{fontFamily:"poppins"}}>You don't have any order yet?</Text>
      <TouchableOpacity className="bg-primary p-2 px-6 rounded" onPress={()=>{navigation.navigate("Main")}}>
      <Text className="text-white font-semibold" style={{fontFamily:"poppins_semibold"}}>Shop Now</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Completed