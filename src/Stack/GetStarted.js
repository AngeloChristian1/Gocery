import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import {AntDesign, Feather} from "@expo/vector-icons";

const GetStarted = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  // const [selectedOption, setSelectedOption] = useState("option1");

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

  return (
    <View className="bg-white">
      <View className="w-full border-black border-[.5px] my-3"></View>
      <View className="bg-white h-full p-3 px-5">
        <Text className=" text-2xl font-extrabold mb-5">Register</Text>
       <View className="flex-row justify-between my-3">
       <TouchableOpacity className="flex-row w-[50%] border p-2 rounded items-center justify-center gap-2 bg-black">
            <AntDesign
            name="apple1"
            size={20}
            color="white"
          />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row border p-[6px] w-[50%] rounded items-center justify-center gap-2">
            <AntDesign
            name="google"
            size={20}
            color="black"
          />
            </TouchableOpacity>
       </View>

        <View>
          <View className="flex-row p-2 border-b-[1px] border-gray-300 justify-between  mb-3">
            <TextInput
            className="text-black font-bold"
              placeholder="Email Address"
              onChangeText={handleEmailChange}
              value={email}
            />
           
          </View>
          <View className="flex-row p-2 border-b-[1px] border-gray-300 justify-between mb-3">
            <TextInput
            className="text-black font-bold"
              placeholder="First Name"
              onChangeText={handlePasswordChange}
              value={password}
            />
            
          </View>
          <View className="flex-row p-2 border-b-[1px] border-gray-300 justify-between  mb-3">
            <TextInput
            className="text-black font-bold"
              placeholder="Last Name"
              onChangeText={handleConfirmChange}
              value={confirm}
            />
          
          </View>
          <View className="flex-row p-2 border-b-[1px] border-gray-300 justify-between  mb-3">
            <TextInput
              placeholder="country"
              className="text-black font-bold"
              onChangeText={handleConfirmChange}
              value={confirm}
            />
          
          </View>
          <View className="flex-row p-2 border-b-[1px] border-gray-300 justify-between  mb-3">
            <TextInput
            className="text-black font-bold"
              placeholder="Password"
              onChangeText={handleConfirmChange}
              value={confirm}
            />
          
          </View>
          <View className="flex-row p-2 border-b-[1px] border-gray-300 justify-between  mb-3">
            <TextInput
            className="text-black font-bold"
              placeholder="Confirm Password"
              onChangeText={handleConfirmChange}
              value={confirm}
            />
          
          </View>
        </View>
        <View className=" gap-3 flex-col my-3 items-center justify-center box-border">
            <TouchableOpacity className="text-white bg-[#08C25E] hover:bg-[#08C25E] focus:bg-[#08C25E] rounded flex-col  py-2 w-full  items-center justify-center gap-2">
            <Text className="text-black font-semibold ">Create Account</Text>
            </TouchableOpacity>

           

        </View>
      </View>
    </View>
  );
};

export default GetStarted;
