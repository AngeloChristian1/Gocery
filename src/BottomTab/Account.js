import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, {useState} from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import AccountText from "../components/AccountText";
import { useNavigation } from "@react-navigation/native";

const Account = () => {
  const navigation = useNavigation();
  const [person, setPerson] =useState({
    name:"Izere Nolan",
    email:"izerenolan21@gmail.com",
    phone: "+1 (805) 479-3639",
    profile: require("../../assets/images/profile.jpeg"),
    DOB:"02/04/2000"
  })
  return (
    <View className="pt-10 px-2 h-full bg-white">
 
      <View className="justify-center align-center flex-col flex m-2  border-gray-500 border-b-0">
        <Text className="font-semibold text-lg text-center">Account</Text>
        <View className="w-full border-gray-300 border-[.5px] my-3"></View>
      </View>

      <View className="items-center justify-center gap-1">
        <Image
          source={person.profile}
          className="w-20 h-20 rounded-full"
        />
        <Text className="font-semibold text-lg ">{person.name}</Text>
        <Text className=" text-normal text-gray-500 mb-3">
          {person.email}
        </Text>
        <TouchableOpacity
          className="bg-primary p-2 px-6 rounded my-2 flex flex-row gap-2 justify-center items-center pb-3"
          onPress={() => {
            navigation.navigate("EditProfile", person);
          }}
        >
        <Feather name="edit-2" size={16} color="white" />
          <Text className="text-white font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <AccountText 
      title="Profile Settings"
      subtitle="Change Your Basic Profile"
      />


      <AccountText 
      title="Promos"
      subtitle="Latest Promo from us"
      />
 
      <AccountText 
      title="My Address"
      subtitle="Your Address"
      />
 
      <AccountText 
      title="Terms, Privacy & Policy"
      subtitle="Things you may want to know"
      />
 
      <AccountText 
      title="Help & Support"
      subtitle="Get Support From Us"
      />
 
      <View className="mx-2 mt-4 flex flex-row justify-between">
        <TouchableOpacity onPress={()=>{alert('Are you sure you want to be signed out')}}>
          <Text className="font-semibold text-lg ">Logout</Text>
          
        </TouchableOpacity>

      </View>
    
      </View>
  );
};

export default Account;
