import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { validate } from "react-native-web/dist/cjs/exports/StyleSheet/validate";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import {
  setAuthProfile,
  setAuthToken,
  setAuthLoaded,
  setAuthStatus,
} from "../redux/authSlice";
// import * as SecureStore from "expo-secure-store";
import { setItemAsync } from "expo-secure-store";


const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirm, setConfirm] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setconfirmError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secureInput, setSecureInput] = useState(true);
  const [secureInputConfirm, setSecureInputConfirm] = useState(true);


  const dispatch = useDispatch();

  const navigation = useNavigation();
  const handleNameChange = (text) => {
    setFullName(text);
  };
  const handlePhoneChange = (text) => {
    setPhone(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };
  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmChange = (text) => {
    setConfirm(text);
  };
  const handleLocationChange = (text) => {
    setLocation(text);
  };

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const Validator = () => {
    if (fullName.length === 0) {
      setNameError("Name is required");
      console.log(nameError);
    }
    else if (email.length === 0) {
      setEmailError("Email is required");
      console.log(emailError);
    }
     else if (!emailPattern.test(email)) {
      setEmailError("Invalid Email");
      console.log(emailError);
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email can't contain space");
      console.log(emailError);
    } 
    else if (phone.length === 0) {
      setPhoneError("Please input phone number");
      console.log(phoneError);
    }
    else if (location.length === 0) {
      setEmailError("Location is required");
      console.log(locationError);
    }
    else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      console.log(passwordError);
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password can't contain space");
      console.log(passwordError); 
    } else if (password !== confirm) {
      setconfirmError("Passwords do not match");
      console.log(confirmError);
    } else if (confirm.length === 0) {
      setconfirmError("Please confirm your password");
      console.log(confirmError);
    } else {
      setEmailError("");
      setPasswordError("");
      setconfirmError("");
      setPhoneError("");
      setNameError("");
      setLocationError("")
      // navigation.navigate("Login");
      setIsLoading(true);
    }
  };

  const handleRegister = async () => {
    axios({
      method: "POST",
      url: `https://grocery-9znl.onrender.com/api/v1/auth/signup`,
      data: {
        email,
        password,
        fullName,
        phone,
        location,
        // role:"manager"
      },
    })
      .then((response) => {
        // dispatch(setAuthProfile(response))
        console.log(response);
        dispatch(setAuthProfile(response.data.user));
        dispatch(setAuthToken(response.data.access_token));
        dispatch(setAuthStatus(true));
        setItemAsync("authToken", response.data.access_token);
        setItemAsync("authProfile", JSON.stringfy(response.data.user));
        setIsLoading(false);
        alert(response.data.message);
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error.response.data.message);
        console.log("error: ", error);
      });
  };

  return (
    <ScrollView>
    <KeyboardAvoidingView className="bg-white">
      <View className="w-full border-gray-300 border-[.5px] my-3"></View>
      <View className="bg-white h-full p-3 px-5">
        <Text className=" font-bold text-2xl  my-4 text-center" style={{fontFamily:"poppins_semibold"}}>Let's get started</Text>
        <Text className="  text-normal text-center mb-7 mt-3 " style={{fontFamily:"poppins"}}>
          Create account to see our top picks for you!
        </Text>

        <View>
          <View className="flex-row px-2 border-[1px] border-gray-400 justify-between  mb-3 rounded items-center">
            <TextInput
              placeholder="Name"
              onChangeText={(text) => setFullName(text)}
              value={fullName}
              className="w-[75%] py-2 "
              style={{fontFamily:"poppins"}}
            />
            <Feather name="user" size={20} color="green" />
          </View>
          <Text className="text-red-600 text-sm mt-[-10px] mx-2" style={{fontFamily:"poppins"}}>
            {nameError}
          </Text>
          <View className="flex-row px-2 border-[1px] border-gray-400 justify-between  mb-3 rounded items-center">
            <TextInput
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
             className="w-[75%] py-2 "
             style={{fontFamily:"poppins"}}
            />
            <Feather name="mail" size={20} color="green" />
          </View>
          <Text className="text-red-600 text-sm mt-[-10px] mx-2"  style={{fontFamily:"poppins"}}>
            {emailError}
           
          </Text>
          <View className="flex-row px-2 border-[1px] border-gray-400 justify-between  mb-3 rounded items-center">
            <TextInput
              placeholder="Phone Number"
              onChangeText={handlePhoneChange}
              value={phone}
              className="w-[75%] py-2 "
              style={{fontFamily:"poppins"}}
            />
            <Feather name="phone" size={20} color="green" />
          </View>
          <Text className="text-red-600 text-sm mt-[-10px] mx-2" style={{fontFamily:"poppins"}}>
            {phoneError}
          </Text>
          <View className="flex-row px-2 border-[1px] border-gray-400 justify-between  mb-3 rounded items-center">
            <TextInput
              placeholder="Location"
              onChangeText={handleLocationChange}
              value={location}
              className="w-[75%] py-2 "
              style={{fontFamily:"poppins"}}
            />
            <Feather name="pin" size={20} color="green" />
          </View>
          <Text className="text-red-600 text-sm mt-[-10px] mx-2" style={{fontFamily:"poppins"}}>
            {locationError}
          </Text>
          <View className="flex-row px-2 border-[1px] border-gray-400 justify-between  mb-3 rounded items-center">
            <TextInput
              placeholder="Password"
              onChangeText={handlePasswordChange}
              value={password}
              className="w-[75%] py-2 items-center"
              secureTextEntry={secureInput}
              style={{fontFamily:"poppins"}}
            />
            <TouchableOpacity style={{marginTop:0}} onPress={()=>{setSecureInput(prev=>!prev);}} >
            {secureInput?(<Feather name="eye" size={20} color="green" />):(<Feather name="eye-off" size={20} color="green" />)}
            </TouchableOpacity>
          </View>
          <Text className="text-red-600 text-sm mt-[-10px] mx-2" style={{fontFamily:"poppins"}}>
            {passwordError}
          </Text>

          <View className="flex-row px-2 border-[1px] border-gray-400 justify-between  mb-3 rounded items-center">
            <TextInput
              placeholder="Confirm Password"
              onChangeText={handleConfirmChange}
              value={confirm}
              className="w-[75%] py-2 items-center"
              secureTextEntry={ secureInputConfirm}
              style={{fontFamily:"poppins"}}
            />
            <TouchableOpacity style={{marginTop:0}} onPress={()=>{ setSecureInputConfirm(prev=>!prev);}} >
            {secureInputConfirm?(<Feather name="eye" size={20} color="green" />):(<Feather name="eye-off" size={20} color="green" />)}
            </TouchableOpacity>
          </View>
          <Text className="text-red-600 text-sm mt-[-10px] mx-2" style={{fontFamily:"poppins"}}>
            {confirmError}
          </Text>
        </View>
        <View className=" gap-3 flex-col my-3 items-center justify-center box-border">
          <TouchableOpacity
            className="text-white bg-[#08C25E] rounded flex-row  py-[6px] w-full  items-center justify-center gap-2 pb-4"
            onPress={() => {
              Validator();
              handleRegister();
            }}
          >

          {isLoading ? (
            <ActivityIndicator color={"#fff"} size={20} />
          ) : (
            <Text className="text-white" style={{fontFamily:"poppins_semibold"}}>Create Account</Text>
          )}
           
          </TouchableOpacity>

          <Text className="text-center my-2" style={{fontFamily:"poppins_semibold"}}>Or</Text>
          <TouchableOpacity className="flex-row border-[1px]  p-[6px] w-full rounded items-center justify-center gap-2 pb-4">
            <AntDesign name="apple1" size={20} color="black" />
            <Text style={{fontFamily:"poppins_semibold"}}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row border p-[6px] w-full rounded items-center justify-center gap-2 pb-4">
            <AntDesign name="google" size={20} color="black" />
            <Text style={{fontFamily:"poppins_semibold"}}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
          <Text className=" font-semibold text-gray-500 my-3" style={{fontFamily:"poppins"}}>
            Already have account, <Text className=" font-semibold text-primary my-3" style={{fontFamily:"poppins_semibold"}}>Login </Text>
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Register;
