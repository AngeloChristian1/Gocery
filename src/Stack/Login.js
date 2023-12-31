import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, ToastAndroid } from "react-native";
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
// import * as SecureStore from 'expo-secure-store';
import { setItemAsync, getItemAsync } from "expo-secure-store";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setconfirmError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [secureInput, setSecureInput] = useState(true);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const handleNameChange = (text) => {
    setName(text);
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
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const Validator = () => {
    if (email.length === 0) {
      setEmailError("Email is required");
      setIsLoading(false);
      console.log(emailError);
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid Email");
      setIsLoading(false);
      console.log(emailError);
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email can't contain space");
      setIsLoading(false);
      console.log(emailError);
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      setIsLoading(false);
      console.log(passwordError);
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password can't contain space");
      setIsLoading(false);
      console.log(passwordError);
    } else {
      setEmailError("");
      setPasswordError("");
      setIsLoading(true);
    }
  };

  const handleLogin = async () => {
    axios({
      method: "POST",
      url: `https://grocery-9znl.onrender.com/api/v1/auth/login`,
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        console.log(response.data.message);
        dispatch(setAuthProfile(response.data.user));
        dispatch(setAuthToken(response.data.access_token));
        dispatch(setAuthStatus(true));
        setItemAsync("authToken", response.data.access_token);
        setItemAsync("authProfile", JSON.stringify(response.data.user));
        setIsLoading(false);
      })
      .catch((error) => { 
        console.log("error: ", error.message);
        if(error.message  == "Request failed with status code 401"){
          
          setEmailError("Invalid email or password");
          setIsLoading(false)
        }
        else{
          setIsLoading(false);
        showToast("Connection Error")
        }
        
      });
  };

  const { authStatus, authProfile } = useSelector((state) => state.auth);
  // console.log("authProfile from login: ",authProfile);


  return (
    
    <KeyboardAvoidingView className="bg-white">

      <View className="bg-white h-full p-3 px-5 mt-20">
        <Text className=" font-bold text-2xl my-6 text-center" style={{fontFamily:"poppins_semibold"}}>Login to continue</Text>

        <View>
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
          <Text className="text-red-600 text-sm mt-[-10px] mx-2" style={{fontFamily:"poppins"}}>
            {emailError}
            
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
        </View>
        <View className=" gap-3 flex-col my-3 items-center justify-center box-border">
          <TouchableOpacity
            className="text-white bg-[#08C25E] rounded flex-row  py-[6px] w-full  items-center justify-center gap-2"
            onPress={() => {
              ()=>{setIsValid(true)}
              
              Validator();
              handleLogin();
            }}
          >
          {isLoading ? (
            <ActivityIndicator color={"#fff"} size={20} />
          ) : (
            <Text className="text-white mb-2 font-bold" style={{fontFamily:"poppins_semibold"}}>Log In</Text>
          )}
            
          </TouchableOpacity>

          <Text className=" font-semibold text-primary my-3" style={{fontFamily:"poppins_semibold"}}>
            Forgot password?
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text className=" font-semibold text-gray-500 my-3" style={{fontFamily:"poppins_semibold"}}>
              Don't have account,
              <Text className=" font-semibold text-primary my-3" style={{fontFamily:"poppins_semibold"}}> signUp</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
