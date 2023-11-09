import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  ProgressChart,
  BarChart,
  PieChart,
} from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getItemAsync } from "expo-secure-store";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

export default Statistics = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState(null);
  const { authProfile } = useSelector((state) => state.auth);
  const { authToken } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statsData, setStatsData] = useState([]);
  const [salesData, setSalesData] = useState([]);
  const [y, setY] = useState([]);
  const [x, setX] = useState([]);

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const getProfile = async () => {
    let userProfile = await getItemAsync("authProfile");
    setProfile(JSON.parse(userProfile));
  };
  useEffect(() => {
    getProfile();
  }, []);

  // console.log("Profile from statistics:", profile);

  // Fetching statistics
  const fetchStatistics = async () => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: `https://grocery-9znl.onrender.com/api/v1/stats/orderstats`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        setStatsData(response?.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error in staistics fetch", error.response.data.message);
        setError(true);
        setStatsData(null);
      });
  };

  const fetchCategoryStats = async () => {
    try {
      const response = await axios.get(
        `https://grocery-9znl.onrender.com/api/v1/stats/salesbycategory`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setSalesData(response?.data.data);

      setIsLoading(false);
    } catch (error) {
      console.error("Error in statistics fetch", error);
      setError(true);
      setSalesData(null);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStatistics();
      fetchCategoryStats();
    }, [])
  );
  if (isLoading) {
    return (
      <View className="flex-row items-center justify-center m-auto h-full">
        <Text style={{fontFamily:"poppins_semibold", fontSize:24}}>Loading...</Text>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          className="ml-4"
        />
      </View>
    );
  } 

  const chartLabel = statsData.map((item) => item._id);
  const chartData = statsData.map((item) => item.orderCount);

  const labels = salesData.map((item) => item.categoryName);
  const data = salesData.map((item) => item.soldItems );
// make data add to 1
  const sum = data.reduce((acc, currentValue) => acc + currentValue, 0);
const normalizedData = data.map((value) => value / sum);
  console.log("CATEGORY SALES STATS", salesData);
  console.log("statsData", statsData);

  console.log(" labels: ", labels, "data:", data);
  console.log("chartLabels: ", chartLabel, "chartData", chartData);

  return (
    <ScrollView className="h-full w-full py-16 bg-white">
      <View className="w-[90%] flex-row justify-between items-center self-center">
        <View>
          <Text style={{ fontFamily: "poppins" }}>Welcome Back </Text>
          {profile?.fullName ? (
            <Text style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
              {profile?.fullName}
            </Text>
          ) : (
            <Text style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
              Grocery Manager
            </Text>
          )}
        </View>
        <View>
          <Image
            source={{ uri: profile?.profilePicture }}
            className="w-16 h-16 relative rounded-full bg-gray-400"
          />
        </View>
      </View>
      {isLoading ? (
        <View className=" w-full h-full bg-gray-500 opacity-70 z-30 bg-opacity-50 backdrop-filter backdrop-blur-lg  top-0  absolute flex-row justify-center items-center">
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="self-center mb-[100vh]"
          />
        </View>
      ) : (
        <View></View>
      )}
      <View className="flex-row flex-wrap w-[90%] self-center justify-around my-3">
        <View className="p-4 px-2 rounded bg-red-400">
          <Text style={{ fontFamily: "poppins" }}>{statsData[0]?._id}</Text>
          <Text style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
            {statsData[0]?.orderCount}+
          </Text>
          <View className="flex-row gap-1 items-center justify-start">
            <Feather name="arrow-up" size={10} color="white" />
            <Text
              className="text-red-800"
              style={{ fontFamily: "poppins", fontSize: 10 }}
            >
              <Text className="font-bold">12.0% increase</Text> vs last week
            </Text>
          </View>
        </View>
        <View className="p-4 rounded px-2 bg-blue-400">
          <Text style={{ fontFamily: "poppins" }}>{statsData[1]?._id}</Text>
          <Text style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
            {statsData[1]?.orderCount}
          </Text>
          <View className="flex-row gap-1 items-center justify-start">
            <Feather name="arrow-down" size={10} color="white" />
            <Text
              className="text-blue-800"
              style={{ fontFamily: "poppins", fontSize: 10 }}
            >
              <Text className="font-extrabold">2.3% decrease</Text> vs last week
            </Text>
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
            <Text
              className="text-green-800"
              style={{ fontFamily: "poppins", fontSize: 10 }}
            >
              <Text className="font-bold">12.0% increase</Text> vs last week
            </Text>
          </View>
        </View>
        <View className="p-4 rounded px-2 bg-purple-400">
          <Text style={{ fontFamily: "poppins" }}>Total Users</Text>
          <Text style={{ fontFamily: "poppins_semibold", fontSize: 20 }}>
            93
          </Text>
          <View className="flex-row gap-1 items-center justify-start">
            <Feather name="arrow-down" size={10} color="white" />
            <Text
              className="text-purple-800"
              style={{ fontFamily: "poppins", fontSize: 10 }}
            >
              <Text className="font-extrabold">4.8% increase</Text> vs last week
            </Text>
          </View>
        </View>
      </View>

      <View className="space-y-4 bg-white h-full flex-col py-2 items-center">
        <Text style={{ fontFamily: "poppins_semibold", fontSize: 16 }}>
          Sales in this Month
        </Text>
        <TouchableOpacity
          className=" rounded-lg overflow-hidden"
          onPress={() => {
            // navigation.navigate("Visualisation");
          }}
        >
          <LineChart
            data={{
              labels: chartLabel,
              datasets: [
                {
                  data: chartData,
                },
              ],
            }}
            width={Dimensions.get("window").width - 20} // from react-native
            height={250}
            // yAxisLabel="$"
            // yAxisSuffix="k"
            // yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 6,
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontFamily: "poppins_semibold", fontSize: 16 }}>
          Sales by category
        </Text>

        <View className="my-2 rounded-lg overflow-hidden">
          <View></View>
          <ProgressChart
            data={{
              labels: labels,
              data: normalizedData,
            }}
            width={Dimensions.get("window").width - 20}
            height={250}
            strokeWidth={16}
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

        <View className="my-2 rounded-lg overflow-hidden bg-gray-200 mb-24 hidden">
          <PieChart
            data={[
              {
                name: "Fruits",
                population: 63,
                color: "#e26a00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Vegetables",
                population: 263,
                color: "#182E83",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Bakery",
                population: 28,
                color: "red",
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
              decimalPlaces: 1.0,
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
