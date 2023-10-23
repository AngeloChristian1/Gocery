import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React,{useState} from 'react'
import PromoCard from '../../components/PromoCard'
import { AntDesign, Feather,MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";


const Promos = () => {
  return (
    <View>
     <PromoCard
     title="BANANA'S 5% OFF"
     subtitle="Banana's 5% off Promo"
     availabitiy="Available until 24 october 2023"
     image={require("../../../assets/images/banana.png")}
     />
   <PromoCard 
   title="FREE SPINACH ON EVERY PURCHASE"
     subtitle="Free spinach"
     availabitiy="Available until 02 July 2023"
     image={require("../../../assets/images/spinach.png")}
   />
    </View>
  
  )
}

export default Promos