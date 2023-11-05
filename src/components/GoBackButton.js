import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {  Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const GoBackButton = () => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity
    onPress={() => {
      navigation.goBack();
    }}
    className="absolute  p-[1px] rounded-md bg-black z-10 top-10 left-5 "
  >
    <Feather name="arrow-left" size={30} color="#08C25E" />
  </TouchableOpacity>
  )
}

export default GoBackButton