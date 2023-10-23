import { View, Text, Button, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Home</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        className="rounded m-3 bg-blue-400 w-[80%] p-3"
      >
        <Text> Lets get started</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="rounded m-3 bg-blue-400 w-[80%] p-3"
      >
        <Text> Log In </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Main")}
        className="rounded m-3 bg-blue-400 w-[80%] p-3"
      >
        <Text> Main</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Vegetables")}
        className="rounded m-3 bg-blue-400 w-[80%] p-3"
      >
        <Text> VegetablesPage</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SingleItem")}
        className="rounded m-3 bg-blue-400 w-[80%] p-3"
      >
        <Text> Single Item</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Recomendation")}
        className="rounded m-3 bg-blue-400 w-[80%] p-3"
      >
        <Text> Recomendation Page</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Cart")}
        className="rounded m-3 bg-blue-400 w-[80%] p-3"
      >
        <Text> Cart Page</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
