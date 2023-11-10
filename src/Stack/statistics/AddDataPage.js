import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { setAuthProfile } from "../../redux/authSlice";
import { setItemAsync, getItemAsync } from "expo-secure-store";
import GoBackButton from "../../components/GoBackButton";

const AddDataPage = ({ route }) => {
  const item = route.params;
  const { authToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [content, setContent] = useState({});
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [hasGalleryPermissions, setHasGalleryPermissions] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [newProfile, setNewProfile] = useState();
  const [phone, setPhone] = useState("");
  const [DOB, setDOB] = useState("");
  const [profile, setProfile] = useState({});

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermissions(galleryStatus.status === "granted");
    })();
  }, []);

  const formData = new FormData();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
      setImageUri(result.assets[0].uri);
    }

    if (hasGalleryPermissions === false) {
      return <Text> No Access to internal storage</Text>;
    }
  };
  // console.log("imag URI : ", imageUri);

  const handleSubmitItem = async () => {
    // console.log("Image assets: ", image?.uri);
    // formData.append("picture", {
    //   uri: image?.assets[0].uri,
    //   type: "image/jpg/png",
    //   name: new Date() + "_picture",
    // });
    formData.append("picture",image.assets[0].uri)
    formData.append("name", name);
    formData.append("email", email);
    formData.append("amount", amount);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categoryId", category);
    console.log("content on press: ", content);

    await axios({
      method: "POST",
      url: `https://grocery-9znl.onrender.com/api/v1/grocery/`,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      data: formData,
    })
      .then((response) => {
        console.log(response.data);
        showToast("Profile updated successfully");
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };


  return (
    <ScrollView
      className="bg-white h-full pt-10"
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
    <GoBackButton/>
      <View className="items-center justify-center gap-1 my-2">
        {image ? (
          <Image
            source={{ uri: image?.assets[0].uri }}
            className="w-40 h-40 rounded-sm bg-slate-200"
          />
        ) : (
          <Image
            source={require("../../../assets/images/upload_image.png")}
            className="w-40 h-40 rounded-sm bg-slate-200 opacity-50 border "
          />
        )}
        <TouchableOpacity
          className="bg-primary p-2 text-primary rounded self-center "
          onPress={() => {
            pickImage();
          }}
        >
          <View className="flex-row gap-3 items-center justify-center">
            <Feather name="edit-2" size={18} color="white" />
            <Text style={{ fontFamily: "poppins", color: "white" }}>
              Add Image
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className=" border-gray-300 border-[.5px] my-3 w-[95%] self-start ml-2 mt-[-2]"></View>

      <View>
        <View className="flex flex-col  mx-10 my-4 border-gray-400 border px-2 rounded py-2 relative">
          <Text
            className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 "
            style={{ fontFamily: "poppins_semibold" }}
          >
            Item Name:
          </Text>
          <TextInput
            placeholder="Item Name"
            onChangeText={(text) => setName(text)}
            value={name}
            style={{ fontFamily: "poppins" }}
          />
        </View>
        <View className="flex-row mx-10 justify-between items-center">
        <View className="flex flex-col w-[60%]   my-4 border-gray-400 border px-2 rounded py-2 relative">
          
          <Text
            className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 "
            style={{ fontFamily: "poppins_semibold" }}
          >
            Item Category:
          </Text>
          <TextInput
            placeholder="Category ID"
            onChangeText={(text) => setCategory(text)}
            value={category}
            style={{ fontFamily: "poppins" }}
          />
        </View>
        <View className="bg-primary p-1 w-[30%] h-12 flex-row items-center justify-center">
        <Text className="text-white" style={{fontFamily:"poppins", fontSize:12}}>Add New Category</Text>
        </View>
        </View>
        <View className="flex flex-col  mx-10  border-gray-400 border px-2 rounded py-2 relative my-4">
          <Text
            className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 "
            style={{ fontFamily: "poppins_semibold" }}
          >
            Item Price:
          </Text>
          <TextInput
            placeholder="Item Price"
            onChangeText={(text) => setPrice(text)}
            value={price}
            style={{ fontFamily: "poppins" }}
          />
        </View>
        <View className="flex flex-col  mx-10  border-gray-400 border px-2 rounded py-2 relative my-4">
          <Text
            className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 "
            style={{ fontFamily: "poppins_semibold" }}
          >
            Item Amount:
          </Text>
          <TextInput
            placeholder="Item Amount"
            onChangeText={(text) => setAmount(text)}
            value={amount}
            style={{ fontFamily: "poppins" }}
          />
        </View>
        <View className="flex flex-col  mx-10 border-gray-400 border px-2 rounded py-6 relative my-4">
          <Text
            className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 "
            style={{ fontFamily: "poppins_semibold" }}
          >
            Item Description
          </Text>
          <TextInput
            placeholder="Item Description"
            onChangeText={(text) => setDescription(text)}
            value={description}
            style={{ fontFamily: "poppins" }}
          />
        </View>
      </View>

      <View className=" gap-3 flex-col my-3 mb-7 items-center justify-center   self-center">
        <TouchableOpacity
          className=" bg-[#08C25E] rounded flex-col px-6  py-[6px] w-[80%]  items-center justify-center gap-2"
          onPress={handleSubmitItem}
        >
          <Text
            className="text-white mb-2 font-bold text-center"
            style={{ fontFamily: "poppins_semibold" }}
          >
            Add Item
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddDataPage;
