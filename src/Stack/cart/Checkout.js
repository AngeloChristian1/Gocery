import { View, Text, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import React from "react";
import { Feather, MaterialIcons,  FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";
import axios from "axios";

const Checkout = ({route}) => {
  
    const item = route.params;
    // console.log("items:||||||||", item)

const navigation =useNavigation()

  const { authStatus, authProfile, authToken } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({});
  const [cartId, setCartId]= useState(item.cartId._id)
  const [totalAmount, setTotalAmount]= useState(item.totalAmount)
  const getProfile = async () => {
    let userProfile = await getItemAsync("authProfile");
    setProfile(JSON.parse(userProfile));
  };
  useEffect(() => {
    getProfile();
  }, []);


  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const handleCheckout = async () => {
    axios({
      method: "POST",
      url: `https://grocery-9znl.onrender.com/api/v1/cart/checkout`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        cartId,
        phone: "0788223344",
        deliverTo: "Kimironko",
        totalAmount
      },
    })
      .then((response) => {
        console.log("response from checkout: ", response.data);
        showToast(response.data.message)
        navigation.navigate("SucceFullScreen")
      })
      .catch((error) => {
        console.log("error in checkout", error);
        // alert(error.response.data.message);
        showToast(error.response.data.message)
      });
  };
  // console.log("Amount and Id", cartId, "  ", totalAmount);
  return (
    <ScrollView className="w-full h-full bg-white relative">
      <Text className="mx-4" style={{ fontFamily: "poppins" }}>
        Destination
      </Text>
      <View className="m-1 mx-2 bg-gray-100 rounded-lg p-1 flex-row">
        <View className="w-32 h-32 bg-primary items-center justify-center">
        <MaterialIcons name="my-location" size={100} color="white" />
        </View>
        <View className=" flex-col my-2 mx-2 items-start justify-between">
          <View style={{ fontFamily: "poppins" }}>
            <Text style={{ fontFamily: "poppins" }}>
              Klab Academy Headquarters
            </Text>
            <Text style={{ fontFamily: "poppins" }}>
              Address: 44 KG 548 St, Kigali
            </Text>
            <Text style={{ fontFamily: "poppins" }}>+(250)78888888</Text>
          </View>
          <TouchableOpacity className="bg-primary rounded-full p-1 px-2 flex-row items-center">
          <MaterialIcons name="edit-location" size={16} color="white" /> 
          <Text
              className="text-center text-white"
              style={{ fontFamily: "poppins" }}
            >
              Choose Another Location
            </Text>
          </TouchableOpacity>
        </View>
      </View>


      <Text className="mx-4" style={{ fontFamily: "poppins" }}>
        Pick Up Time
      </Text>
      <View className="m-1 mx-2 bg-gray-100 rounded-lg p-1 flex-row">
        
        <View className=" flex-col my-2 mx-2 items-start justify-between">
          <View  style={{ fontFamily: "poppins" }} className="flex-row w-[94%]  justify-between align-center my-1">
          <View className="flex-row items-center gap-2 ">
          <Feather name="clock" size={20} color="black" />
            <Text style={{ fontFamily: "poppins" }} className="mr-24">
              Fri, Jun 17, 2023 - 12.30
            </Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="green" />
          </View>
          <View  style={{ fontFamily: "poppins" }} className="flex-row w-[94%]  justify-between align-center my-1 mt-2">
          <View className="flex-row items-center gap-2 ">
          <Feather name="clock" size={20} color="black" />
            <Text style={{ fontFamily: "poppins" }} className="mr-24">
              Pick Up Time 30-40 Min
            </Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="green" />
          </View>

          
        </View>
      </View>


      <Text className="mx-4" style={{ fontFamily: "poppins" }}>
        Total
      </Text>
      <View className="m-1 mx-2 bg-gray-100 rounded-lg p-1 flex-col ]">
      <View className="  flex-row my-1">
      <View className=" flex-row my-1 mx-2 items-center justify-between w-[110%]">
            <Text style={{ fontFamily: "poppins" }} className="mr-24">
              Order Total
            </Text>
            <Text style={{ fontFamily: "poppins" }} className="mr-24">
               {totalAmount}.00 Rwf
            </Text>
        </View>
      </View>
      <View className="  flex-row my-1">
      <View className=" flex-row my-1 mx-2 items-center justify-between w-[110%]">
            <Text style={{ fontFamily: "poppins" }} className="mr-24">
              Delivery Fee
            </Text>
            <Text style={{ fontFamily: "poppins" }} className="mr-24">
              0.00 Rwf
            </Text>
        </View>
      </View>
      <View className="  flex-row my-1">
      <View className=" flex-row my-1 mx-2 items-center justify-between w-[110%]">
            <Text style={{ fontFamily: "poppins_semibold" }} className="mr-24">
              Total
            </Text>
            <Text style={{ fontFamily: "poppins_semibold" }} className="mr-24">
            {totalAmount}.00 Rwf
            </Text>
        </View>
      </View>
        
      </View>

      <Text className="mx-4" style={{ fontFamily: "poppins" }}>
        Payment Method
      </Text>
      <View>
      <View className="m-1 mx-2 bg-gray-100 rounded-lg flex-row p-2 ]">
        
      <View className="flex-row items-center gap-4 my-1 mt-0">
      <FontAwesome5 name="cc-apple-pay" size={30} color="black" />
        <Text style={{ fontFamily: "poppins" }} className="mr-24">
          Apple Pay
        </Text>
      </View>
      <View className="flex-row items-center gap-4 my-1 w-[50%]  rounded justify-cente">
      <FontAwesome5 name="cc-visa" size={30} color="black" />
        <Text style={{ fontFamily: "poppins" }} className="mr-20">
          Visa card
        </Text>
      </View>
      
      </View>
      <TouchableOpacity className="bg-primary rounded-lg p-1 px-2 flex-row items-center justify-center ">
          <Text
              className="text-center text-white"
              style={{ fontFamily: "poppins" }}
            >
              Add Card
            </Text>
          </TouchableOpacity>
      </View>
      
     
      <TouchableOpacity className="bg-primary rounded p-3 px-2 flex-row items-center justify-center my-2 mt-10 w-[70%] self-center" 
      onPress={async ()=>{
        await handleCheckout()
       
      }}
      >
      <Text className="text-center text-white"
      style={{ fontFamily: "poppins" }}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Checkout;


// <Text className="mx-4" style={{ fontFamily: "poppins" }}>
// Add Promo Code 
// </Text>
// <View className="m-1 mx-2 bg-gray-100 rounded-lg flex-col p-2 ]">

// <View className="flex-row items-center gap-4 my-1 ">
// <SimpleLineIcons name="badge" size={24} color="green" />
// <Text style={{ fontFamily: "poppins" }} className="mr-24">
//   Add Promo code 
// </Text>
// </View>


// </View>