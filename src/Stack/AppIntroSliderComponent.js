// import React from "react";
// import { Text, View, Image } from "react-native";
// import AppIntroSlider from "react-native-app-intro-slider";
// import { useState } from "react";
// import { SIZES, COLORS } from "./theme";

// const slides = [
//   {
//     key: 1,
//     title: "Daily needs",
//     heading: "Your Daily needs",
//     text: "Your Daily needs",
//     image: require("../../assets/2.jpg"),
//     button: "",
//     backgroundColor: "#59b2ab",
//     description:
//       "Your online super market, delivering Groceries and more daily need products across Moradabad.Daily Grocery: Your New Best Online Grocery Store.Trusted by a number of happy customers.",
//   },
//   {
//     key: 2,
//     title: "Easy Shopping",
//     heading: "Easy shopping",
//     text: "Fresh groceries at our doorstep in the next hour",
//     image: require("../../assets/easy.png"),
//     backgroundColor: "#febe29",
//     description:
//       "Curated a collection that spans across various categories, catering to diverse interests and preferences. From fashion to electronics, home essentials to beauty products, and everything in between – our extensive range ensures that you find exactly what you're looking for.",
//   },
//   {
//     key: 3,
//     title: "Deliver At your doorsteps",
//     text: "Deliver at your doorstep",
//     image: require("../../assets/deliver.png"),
//     backgroundColor: "#22bcb5",
//     description:
//       "Curated a collection that spans across various categories, catering to diverse interests and preferences. From fashion to electronics, home essentials to beauty products, and everything in between – our extensive range ensures that you find exactly what you're looking for.",
//   },
// ];

// const AppIntroSliderComponent = () => {
//   const buttonLabel = (label) => {
//     return (
//       <View className="p-2 bg-primary rounded-2xl px-3 py-2 items-center ">
//         <Text className="font-semibold text-sky-100">{label}</Text>
//       </View>
//     );
//   };
//   return (
//     <AppIntroSlider
//       data={slides}
//       onDone={() => setShowRealApp(true)}
//       renderItem={({ item }) => {
//         return (
//           <View
//             className=" justify-center items-center h-[80%] p-2"
//             style={{
//               width: SIZES.width - 80,
//               height: 400,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Image
//               source={item.image}
//               style={{ width: SIZES.width - 80, height: 400 }}
//               resizeMode="contain"
//             />
//             <Text className="font-semibold text-lg"> {item.title}</Text>
//             <Text
//               className="text-gray-500 text-sm px-5 my-3"
//               style={{ width: SIZES.width - 80 }}
//             >
//               {item.description}
//             </Text>
//           </View>
//         );
//       }}
//       activeDotStyle={{
//         backgroundColor: COLORS.primary,
//         width: 25,
//       }}
//       renderSkipButton={() => buttonLabel("Skip")}
//       renderDoneButton={() => buttonLabel("Done")}
//     />
//   );
// };

// export default AppIntroSliderComponent;
