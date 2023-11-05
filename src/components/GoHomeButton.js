import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {  Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const GoHomeButton = () => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity
    onPress={() => {
      navigation.navigate("Main");
    }}
    className="absolute  p-[1px] rounded-md bg-black z-10 top-10 left-5 w-[30] h-[30] items-center justify-center"
  >
    <Feather name="home" size={20} color="#08C25E" />
  </TouchableOpacity>
  )
}

export default GoHomeButton