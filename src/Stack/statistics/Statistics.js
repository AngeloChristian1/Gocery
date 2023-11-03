import { View, Text, Dimensions, Button, ScrollView } from "react-native";
import { LineChart, ProgressChart, BarChart,PieChart } from "react-native-chart-kit";

export default Statistics = ({ navigation }) => {
  return (
    <ScrollView className="h-full w-full">
    <View className="space-y-4 pt-10 bg-white h-full flex-col justify-center items-center">
    <View className="my-2 rounded-lg overflow-hidden">
    <LineChart
    data={{
      labels: ["1st week", "2nd week", "3rd week", "4th week"],
      datasets: [
        {
          data: [4, 10, 16, 32],
        },
      ],
    }}
    width={Dimensions.get("window").width-20}
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
        marginBottom:10,
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726",
      },
    }}
    bezier
  />
    </View>

    <View className="my-2 rounded-lg overflow-hidden">
      <ProgressChart
        data={{
          labels: ["Vegetables", "Fruits", "Meat", "Seafood", "Milk & Eggss", " Bread","Frozen","Organic"],
          data: [0.9, 0.4, 0.7, 0.3, 0.5, 0.34, 0.81, 0.4],
        }}
        width={Dimensions.get("window").width -20}
        height={250}
        strokeWidth={6}
        radius={40}
        chartConfig={{
          backgroundColor: "#08c25e",
          backgroundGradientFrom: "#08C25E",
          backgroundGradientTo: "#08C25E",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(2,46,31 , ${opacity})`,
          labelColor: (opacity = 1) => "#000",
          style: {
            borderRadius: 16,
            paddingRight:5,
          },
          propsForDots: {
            r: "2",
            strokeWidth: "1",
            stroke: "white",
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
            data: [20, 45, 28, 80, 99, 43]
          }
        ]
      }}
  // style={graphStyle}
  // data={data}
  width={Dimensions.get("window").width-20}
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
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ]}
  width={Dimensions.get("window").width-20}
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
