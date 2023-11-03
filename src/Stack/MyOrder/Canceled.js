import { View, Text, ToastAndroid, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import OrderCard from "../../components/OrderCard";
import axios from "axios";
import { getItemAsync } from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const Canceled = () => {
  const navigation = useNavigation();
  const { authToken } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
  // console.log("auth token from inprogress", authToken);
  const fetchOrders = async () => {
    axios({
      method: "GET",
      url: `https://grocery-9znl.onrender.com/api/v1/cart/orderhistory`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log(
          "response from orders in history___________: ",
          response.data
        );
        setOrders(response.data.data);
        showToast("orders in history");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error in history", error);
        showToast(error.response.data.message);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch cart data or perform any other actions when the screen is focused.
      fetchOrders(); // Example: Fetch cart data
    }, [])
  );

  useEffect(() => {
    if (authToken) {
      fetchOrders();
    }
  }, [authToken]);

  const oneOrder = {
    id: 1,
    orderId: "Ed1234CZ",
    deliver: "My Home",
    locationIcon: "home",
    statusIcon: "check-circle",
    status: "Ready to collect",
    payment: "$8.95",
    statusIconColor: "#08C25E",
  };
  //
  return (
    <ScrollView className="h-full bg-white w-full flex-col">
      <View classname="w-[90%] mx-auto bg-red-300 h-full">
        {orders.map((order) => {
          return (
            <OrderCard
              orderId={order._id}
              deliver={order.deliveryAddress}
              locationIcon="location-arrow"
              statusIcon={oneOrder.statusIcon}
              status={order.orderStatus}
              payment={order.totalAmount}
              statusIconColor="#08C25E"
              transaction={order.transactionId}
              date={order.date}
            />
            
          );
        })}
        <View className="border border-black"></View>
      </View>
    </ScrollView>
  );
};

export default Canceled;
