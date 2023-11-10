import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, Alert } from "react-native";
import React, {useState, useEffect} from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import AccountText from "../components/AccountText";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {deleteItemAsync,  setItemAsync, getItemAsync} from "expo-secure-store"
import { setAuthLoaded,setAuthStatus, setAuthProfile, setAuthToken } from "../redux/authSlice";



const Account = () => {
  const dispatch = useDispatch();
  const [profile, setProfile]= useState({})
  const { authProfile } = useSelector((state) => state.auth);
  // const [email, setEmail]= useState("")
  const navigation = useNavigation();
  const [person, setPerson] =useState({
    name:"Izere Nolan",
    email:"izerenolan21@gmail.com",
    phone: "+1 (805) 479-3639",
    profile: require("../../assets/images/profile.jpeg"),
    DOB:"02/04/2000"
  })

const handleLogout = ()=>{
  console.log("Logging Out")
  deleteItemAsync('authToken')
  deleteItemAsync("authProfile")
  deleteItemAsync("userCart")
  dispatch(setAuthToken(false))
  dispatch(setAuthProfile(null))
  dispatch(setAuthStatus(false))
  alert("logout successful")
  
}

;

// const userProfile = useSelector((state) => state.auth.authProfile);
const getProfile = async ()=>{

 let userProfile =await getItemAsync("authProfile")
 setProfile(JSON.parse(userProfile))
};
useEffect(
  ()=>{getProfile()}
  
  ,[])

console.log("Profile from account:", (profile))

const LogOutAlert = () =>
Alert.alert('Log Out', 'Are You  sure You want to Log out', [
  {
    text: 'Cancel',
    onPress: () => console.log('Cancel Pressed'),
    style: 'cancel',
  },
  {text: 'OK', onPress: () =>  handleLogout()},
]);

  return (
    <ScrollView className="pt-10 px-2 h-full bg-white mb-10">
    <View className="pt-10 px-2 h-full bg-white">
 
      <View className="justify-center align-center flex-col flex m-2  border-gray-500 border-b-0">
        <Text className="font-semibold text-lg text-center" style={{fontFamily:"poppins_semibold"}}>Account</Text>
        <View className="w-full border-gray-300 border-[.5px] my-3"></View>
      </View>

      <View className="items-center justify-center gap-1 ">
      {profile? (<Image
      source={{ uri: profile.profilePicture }}
      className="w-20 h-20 rounded-full bg-slate-200"
    />):
       ( <Image
          source={person?.profile}
          className="w-20 h-20 rounded-full bg-slate-200"
        />)}
        <Text  style={{fontFamily:"poppins_semibold"}}className="font-semibold text-lg ">{profile?.fullName}</Text>
        <Text className=" text-normal text-gray-500 mb-3" style={{fontFamily:"poppins_bold"}}>
        {profile?.email}
        </Text>
        <TouchableOpacity
          className="bg-primary p-2 px-6 rounded my-2 flex flex-row gap-2 justify-center items-center pb-3"
          onPress={() => {
            navigation.navigate("EditProfile", profile);
          }}
        >
        <Feather name="edit-2" size={16} color="white" />
          <Text className="text-white font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {authProfile?.role == "manager" && (
        <>
          <AccountText
            title="Profile Settings"
            subtitle="Change Your Basic Profile"
            
          />
          <AccountText
            title="Add Items"     
            subtitle="Add new items to the store"
            onPress={()=>{navigation.navigate("AddDataPage")}}
          />
          <AccountText title="Promos Available" subtitle="Add new promos" />
        </>
      )}
      {authProfile?.role == "user" && (
        <>
        <AccountText title="Promos" subtitle="Latest Promo from us" />

        <AccountText 
        title="My Address"
        subtitle="Your Address"
        />
   
        <AccountText 
        title="Terms, Privacy & Policy"
        subtitle="Things you may want to know"
        />
   
        <View className="mx-2 my-4 flex flex-row justify-between">
        <TouchableOpacity onPress={handleLogout}>
          <Text className="font-semibold  " style={{fontFamily:"poppins_semibold"}}>Logout</Text> 
        </TouchableOpacity>
      </View>

        <AccountText 
        title="Help & Support"
        subtitle="Get Support From Us"
        />
    
       
        </>
      )}
      <View className="mx-2 my-4 flex flex-row justify-between">
      <TouchableOpacity onPress={handleLogout}>
        <Text className="font-semibold  " style={{fontFamily:"poppins_semibold"}}>Logout</Text> 
      </TouchableOpacity>
    </View>
    
      </View>
      </ScrollView>
  );
};

export default Account;
