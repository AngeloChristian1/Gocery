import {
  View,
  Text,
  Dimensions,
  Button,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  ProgressChart,
  BarChart,
  PieChart,
} from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deleteItemAsync, setItemAsync, getItemAsync } from "expo-secure-store";
import {
  setAuthLoaded,
  setAuthStatus,
  setAuthProfile,
  setAuthToken,
} from "../../redux/authSlice";
import { Feather } from '@expo/vector-icons'; 
// import { useNavigation } from "@react-navigation/native";

export default Statistics = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const { authProfile } = useSelector((state) => state.auth);

  const getProfile = async () => {
    let userProfile = await getItemAsync("authProfile");
    setProfile(JSON.parse(userProfile));
  };
  useEffect(() => {
    getProfile();
  }, []);

  console.log("Profile from statistics:", profile);

  return (
    <ScrollView className="h-full w-full py-16 bg-white">
      <View className="w-[90%] flex-row justify-between items-center self-center">
        <View>
          <Text style={{ fontFamily: "poppins" }}>Welcome Back </Text>
          <Text style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
            {profile?.fullName}{" "}
          </Text>
        </View>
        <View>
          <Image
            source={{ uri: profile?.profilePicture }}
            className="w-16 h-16 rounded-full"
          />
        </View>
      </View>
      <View className="flex-row flex-wrap w-[90%] self-center justify-around my-3">
        <View className="p-4 px-2 rounded bg-red-400">
          <Text style={{ fontFamily: "poppins" }}>Items Sold</Text>
          <Text style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
            321+
          </Text>
          <View className="flex-row gap-1 items-center justify-start">
          <Feather name="arrow-up" size={10} color="white" />
          <Text className="text-red-800" style={{ fontFamily: "poppins", fontSize:10 }}> <Text className="font-bold">12.0% increase</Text> vs last week</Text>
          </View>
        </View>
        <View className="p-4 rounded px-2 bg-blue-400">
          <Text style={{ fontFamily: "poppins" }}>New Users</Text>
          <Text style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
            133
          </Text>
          <View className="flex-row gap-1 items-center justify-start">
          <Feather name="arrow-down" size={10} color="white" />
          <Text className="text-blue-800" style={{ fontFamily: "poppins", fontSize:10 }}> <Text className="font-extrabold">2.3% decrease</Text> vs last week</Text>
          </View>
        </View>
      </View>
      <View className="flex-row flex-wrap w-[90%] self-center justify-around my-3">
        <View className="p-4 px-2 rounded bg-green-400">
          <Text style={{ fontFamily: "poppins" }}>Total Revenue</Text>
          <Text style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
            248,000 Rwf
          </Text>
          <View className="flex-row gap-1 items-center justify-start">
          <Feather name="arrow-up" size={10} color="white" />
          <Text className="text-green-800" style={{ fontFamily: "poppins", fontSize:10 }}> <Text className="font-bold">12.0% increase</Text> vs last week</Text>
          </View>
        </View>
        <View className="p-4 rounded px-2 bg-purple-400">
          <Text style={{ fontFamily: "poppins" }}>Canceled Orders</Text>
          <Text style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
            23
          </Text>
          <View className="flex-row gap-1 items-center justify-start">
          <Feather name="arrow-down" size={10} color="white" />
          <Text className="text-purple-800" style={{ fontFamily: "poppins", fontSize:10 }}> <Text className="font-extrabold">4.8% increase</Text> vs last week</Text>
          </View>
        </View>
      </View>
      
      <View className="space-y-4 bg-white h-full flex-col py-2 items-center">
      <Text style={{ fontFamily: "poppins_semibold", fontSize: 16 }}>
            Sales in this Month
          </Text>
        <TouchableOpacity className=" rounded-lg overflow-hidden" onPress={()=>{navigation.navigate("Visualisation")}}>
          <LineChart
            data={{
              labels: ["1st week", "2nd week", "3rd week", "4th week"],
              datasets: [
                {
                  data: [4, 10, 16, 32],
                },
              ],
            }}
            width={Dimensions.get("window").width - 20}
            height={220}
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#182E83",
              backgroundGradientTo: "#182E83",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => ` rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                marginBottom: 10,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
          />
        </TouchableOpacity>
        <Text style={{ fontFamily: "poppins_semibold", fontSize: 16 }}>
        Sales by category
      </Text>

        <View className="my-2 rounded-lg overflow-hidden">
       
          <View>
          
          </View>
          <ProgressChart
            data={{
              labels: [
                "Vegetables",
                "Fruits",
                "Meat",
                "Seafood",
                "Milk&Eggs",
                " Bread",
                "Frozen",
                "Organic",
              ],
              data: [0.9, 0.4, 0.7, 0.3, 0.5, 0.34, 0.81, 0.4],
            }}
            width={Dimensions.get("window").width - 20}
            height={250}
            strokeWidth={6}
            radius={40}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#182E83",
              backgroundGradientTo: "#182E83",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(25, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => ` rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
                marginBottom: 10,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            hideLegend={false}
          />
        </View>

        <View className="my-2 rounded-lg overflow-hidden">
          <BarChart
            data={{
              labels: ["January", "February", "March", "April", "May", "June"],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                },
              ],
            }}
            // style={graphStyle}
            // data={data}
            width={Dimensions.get("window").width - 20}
            height={220}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => ` rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 36,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            verticalLabelRotation={30}
          />
        </View>

        <View className="my-2 rounded-lg overflow-hidden bg-gray-200">
          <PieChart
            data={[
              {
                name: "Seoul",
                population: 21500000,
                color: "rgba(131, 167, 234, 1)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Toronto",
                population: 2800000,
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Beijing",
                population: 527612,
                color: "red",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "New York",
                population: 8538000,
                color: "#ffffff",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Moscow",
                population: 11920000,
                color: "rgb(0, 0, 255)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
            ]}
            width={Dimensions.get("window").width - 20}
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => ` rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 36,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            center={[10, 50]}
            absolute
          />
        </View>
      </View>
    </ScrollView>
  );
};
