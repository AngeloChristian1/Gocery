import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { validate } from "react-native-web/dist/cjs/exports/StyleSheet/validate";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setconfirmError] = useState("");


  const navigation =useNavigation()

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
      console.log(emailError);
    } else if (!emailPattern.test(email)) {
      setEmailError("Invalid Email");
      console.log(emailError);
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email can't contain space");
      console.log(emailError);
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      console.log(passwordError);
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password can't contain space");
      console.log(passwordError);
    } 
    
     else {
      setEmailError("");
      setPasswordError("");
    
      navigation.navigate("Main");
    }
  };

  return (
    <View className="bg-white">
      <View className="w-full border-gray-300 border-[.5px] my-3"></View>
      <View className="bg-white h-full p-3 px-5">
        <Text className=" font-bold text-2xl my-3">Login to continue</Text>
     

        <View>
          <View className="flex-row p-2 border-b-[1px] border-gray-300 justify-between  mb-3">
            <TextInput
              placeholder="Email"
              onChangeText={text => setEmail(text)}
              value={email}
            />
            <Feather name="mail" size={20} color="green" />
          </View>
          <Text className="text-red-600 text-sm mt-[-10px] mx-2">
            {emailError}
          </Text>
          <View className="flex-row p-2 border-b-[1px] border-gray-300 justify-between mb-3">
            <TextInput
              placeholder="Password"
              onChangeText={handlePasswordChange}
              value={password}
            />
            <Feather name="eye-off" size={20} color="green" />
          </View>
          <Text className="text-red-600 text-sm mt-[-10px] mx-2">
            {passwordError}
          </Text>

        
        </View>
        <View className=" gap-3 flex-col my-3 items-center justify-center box-border">
          <TouchableOpacity
            className="text-white bg-[#08C25E] rounded flex-row  py-[6px] w-full  items-center justify-center gap-2"
            onPress={Validator}
          >
            <Text className="text-white mb-2 font-bold">Log In</Text>
          </TouchableOpacity>

          <Text className=" font-semibold text-primary my-3">Forgot password?</Text>

       
        </View>
      </View>
    </View>
  );
};

export default Login;
