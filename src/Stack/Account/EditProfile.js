import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";

const EditProfile = ({ route }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState("");
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const item = route.params;
  return (
    <View className="bg-white h-full">
      <View className="items-center justify-center gap-1 my-2 ">
        <Image source={item.profile} className="w-40 h-40 rounded-full" />
        <View className="bg-primary p-2 text-primary rounded-full absolute bottom-0 right-[35%]">
          <Feather name="edit-2" size={18} color="white" />
        </View>
      </View>
      <View className=" border-gray-300 border-[.5px] my-3 w-[95%] self-start ml-2 mt-[-2]"></View>

      <View >
        <View className="flex flex-col  mx-10 my-4 border-gray-400 border px-2 rounded py-2 relative">
        <Text className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 ">Name:</Text>
          <TextInput
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            value={item.name}
          />
        </View>
        <View className="flex flex-col  mx-10 my-4 border-gray-400 border px-2 rounded py-2 relative">
        <Text className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 ">Email:</Text>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={item.email}
          />
        </View>
       
        <View className="flex flex-col  mx-10  border-gray-400 border px-2 rounded py-2 relative my-4">
        <Text className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 ">Phone Number:</Text>
          <TextInput
            placeholder="Phone Number"
            onChangeText={(text) => setPhone(text)}
            value={item.phone}
          />
        </View>
        <View className="flex flex-col  mx-10 border-gray-400 border px-2 rounded py-2 relative my-4">
        <Text className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 ">Date Of Birth</Text>
          <TextInput
            placeholder="DOB"
            onChangeText={(text) => setDOB(text)}
            value={item.DOB}
          />
        </View>
      </View>

      <View className=" gap-3 flex-col my-3 items-center justify-center absolute bottom-10 justify-self-end align-middle self-center">
      <TouchableOpacity
        className="text-white bg-[#08C25E] rounded flex-row  py-[6px] w-[80%]  items-center justify-center gap-2"
      >
        <Text className="text-white mb-2 font-bold">Update Profile</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default EditProfile;
