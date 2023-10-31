import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Touchable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import SmallCard from "../components/SmallCard";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getItemAsync, deleteItemAsync } from "expo-secure-store";
import { setAuthLoaded,setAuthStatus, setAuthProfile, setAuthToken } from "../redux/authSlice";
import axios from "axios";

const Main = () => {
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [profile, setProfile]= useState({})
  const [isLoading, setIsLoading] = useState(true);
  const { authToken } = useSelector((state) => state.auth);
  const { authProfile } = useSelector((state) => state.auth);
  
  // console.log("authProfile", authProfile)

  const handleSearchChange = (text) => {
    setName(searchInput);
  };

  const navigation = useNavigation();

  const handleLogout = ()=>{
    console.log("Logging Out")
    deleteItemAsync('authToken')
    deleteItemAsync("authProfile")
    dispatch(setAuthToken(false))
    dispatch(setAuthProfile(null))
    dispatch(setAuthStatus(false))
    alert("logout successful")
  }
  const fetchCategories = async () => {
    axios({
      method: "GET",
      url: `https://grocery-9znl.onrender.com/api/v1/category`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        setCategories(response.data.data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("error in main:", error);
        
        // if(error.response.data.message==="jwt expired"){
        //   dispatch(setAuthToken(false))
        //   dispatch(setAuthStatus(false))
        // }
      });
  };

  useEffect(() => {
    if (authToken) {
      fetchCategories();
    }
  }, [authToken]);

  let result = getItemAsync("authToken");

  const banana = {
    title: "Banana",
    image: require("../../assets/images/banana.png"),
    desrciption:
      "Msonge Organic Family Farm offers a wide range of products that are fresh, organic and picked when they are ripe and have the highest nutritional value. Please note all Msonge Organic Family Farm are delivered on the following days",
    discount: "10%",
    price: "$0.39",
    discounted: "$0.42",
    quantity: "200gr",
    rating: 4.7,
    color: "#ECFFF5",
    location: "From Canada",
  };

  return (
    <ScrollView>
      <View className="h-[100vh] bg-white w-full">
        <View className="w-full bg-primary h-[45%] justify-between items-center relative overflow-hidden pt-10">
          <View className="absolute right-0 h-[300px] w-[400px] bg-green-600 rotate-[-45deg] rounded-full translate-x-[120px] translate-y-24"></View>
          <View className="w-full bg-transparent p-3 flex-row justify-between items-center">
            <View className="flex-row w-[80%] p-2 bg-gray-200 rounded opacity-100 justify-between mt-3 mb-3">
              <TextInput
                placeholder="Search for products"
                onChangeText={handleSearchChange}
                value={searchInput}
              />
              <Ionicons name="ios-search-sharp" size={24} color="white" />
            </View>
            <MaterialCommunityIcons name="bell" size={25} color="white" />
          </View>
          <View className="w-full mx-auto flex-row justify-between px-5 h-[70%] self-center gap-4">
            <View className="w-[50%] h-[75%] items-center  justify-between gap-4">
              <Text className="font-extrabold text-3xl w-full text-white">
                BANANA 5% OFF
              </Text>
              <TouchableOpacity
                className="bg-[#FFB82E] w-full px-3 py-2 my-2  rounded"
                onPress={() => {
                  navigation.navigate("SingleItem", banana);
                }}
              >
                <Text className="font-extrabold text-white text-center">
                  BUY NOW
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-[45%] h-[100%] object-contain  flex-row justify-center items-center">
              <Image
                source={require("../../assets/images/banana.png")}
                style={{ resizeMode: "contain" }}
                className="w-[100%] h-[60%] object-contain rotate-[-30deg] translate-y-[-30px]"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Recommendation");
          }}
        >
          <Text className="text-right px-5 my-2">View Recommended</Text>
        </TouchableOpacity>
        <View className="flex-col items-center justify-center my-3">
          <Image
            source={require("../../assets/images/voucher.png")}
            className="w-[85%] h-10  object-contain  "
          />
        </View>
      {!isLoading? ( <View className="flex-row flex-wrap mx-auto items-center  justify-center  w-[90%]">
          {categories?.map((category, index) => {
            return (
              <SmallCard
                key={index}
                title={category?.name}
                ImageURL={category?.picture || ""}
                link="Vegetables"
                item={category}
                action={() => navigation.navigate("Vegetables", category)}
              />
            );
          })}
        </View>):(<ActivityIndicator  className="h-[30%]" color="green" size="large"/>)}
        <View></View>
        <View className="p-2 mx-2">
          <Text className="text-xl font-bold">For your dinner</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Main;
