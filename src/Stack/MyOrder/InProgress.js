import { View, Text, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import OrderCard from "../../components/OrderCard";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const InProgress = () => {
  const navigation = useNavigation();
  const { authToken } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
  console.log("auth token from inprogress", authToken);
  const fetchOrders = async () => {
    axios({
      method: "GET",
      url: `https://grocery-9znl.onrender.com/api/v1/cart/ongoingorders`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log(
          "response from orders in progress___________: ",
          response.data.data
        );
        setOrders(response.data.data);
        showToast("orders in progress");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error in cart page", error);
        showToast(error.response.data.message);
      });
  };
  useEffect(() => {
    if (authToken) {
      fetchOrders();
    }
  }, [authToken]);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch cart data or perform any other actions when the screen is focused.
      fetchOrders(); // Example: Fetch cart data
    }, [])
  ); 
  

  const oneOrder = {
    id: 1,
    orderId: "Ed1234CZ",
    deliver: "My Home",
    locationIcon: "home",
    statusIcon: "dot-circle-o",
    status: "Ready to collect",
    payment: "$8.95",
    statusIconColor: "#08C25E",
  };

  return (
    <View className="h-full bg-white">
      {orders.map((order) => {
        return (
          <OrderCard
          key={order.Id}
            orderId={order._id}
            deliver={order.deliveryAddress}
            locationIcon="location-arrow"
            statusIcon={oneOrder.statusIcon}
            status={order.orderStatus}
            payment={order.totalAmount}
            statusIconColor="#08C25E"
            transaction={order.transactionId}
            date={order.date}
            onPress={()=>{navigation.navigate("SingleOrderPage", orders)}}
          />
        );
      })}
    
    </View>
  );
};

export default InProgress;
