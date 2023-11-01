import { Text, View, Image } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./src/Navigation/AuthNavigation";
import { SIZES, COLORS } from "./src/Stack/theme";
import { Provider } from "react-redux";
import {store} from "./src/redux/store"
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
// import {persistStore} from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";

const slides = [
  {
    key: 1,
    title: "Daily needs",
    heading: "Your Daily needs",
    text: "Your Daily needs",
    image: require("./assets/2.jpg"),
    button: "",
    backgroundColor: "#59b2ab",
    description:
      "Your online super market, delivering Groceries and more daily need products across Moradabad.Daily Grocery: Your New Best Online Grocery Store.Trusted by a number of happy customers.",
  },
  {
    key: 2,
    title: "Easy Shopping",
    heading: "Easy shopping",
    text: "Fresh groceries at our doorstep in the next hour",
    image: require("./assets/easy.png"),
    backgroundColor: "#febe29",
    description:
      "Curated a collection that spans across various categories, catering to diverse interests and preferences. From fashion to electronics, home essentials to beauty products, and everything in between – our extensive range ensures that you find exactly what you're looking for.",
  },
  {
    key: 3,
    title: "Deliver At your doorsteps",
    text: "Deliver at your doorstep",
    image: require("./assets/deliver.png"),
    backgroundColor: "#22bcb5",
    description:
      "Curated a collection that spans across various categories, catering to diverse interests and preferences. From fashion to electronics, home essentials to beauty products, and everything in between – our extensive range ensures that you find exactly what you're looking for.",
  },
];


const buttonLabel = (label) => {
  return (
    <View className="p-2 bg-white rounded-2xl px-3 py-2 items-center ">
      <Text className="font-bold text-primary">{label}</Text>
    </View>
  );
};
export default function App() {
  const [showRealApp, setShowRealApp] = useState(false);
  const [fontsLoaded] = useFonts({
    'Philosopher': require('./assets/fonts/Philosopher-Regular.ttf'),
    'YesevaOne': require('./assets/fonts/YesevaOne-Regular.ttf'),
    'YesevaOne-Regular': require('./assets/fonts/YesevaOne-Regular.ttf'),
    "poppins":require("./assets/fonts/poppins/Poppins-Regular.ttf"),
    "poppins_semibold":require("./assets/fonts/poppins/Poppins-SemiBold.ttf"),
    "poppins_bold":require("./assets/fonts/poppins/Poppins-ExtraBold.ttf"),
    "work_sans": require("./assets/fonts/work_sans/static/WorkSans-Regular.ttf")
  });

  useEffect(()=>{
    async function prepare(){
      await SplashScreen.preventAutoHideAsync();
    };
    if (!fontsLoaded) {
    prepare();
    }else{
      SplashScreen.hideAsync();
    }
  },[fontsLoaded])
 

  if (!fontsLoaded) {
    return null;
  }return( 
  showRealApp ? (

    <Provider store={store}>
      <NavigationContainer style={{fontFamily:"poppins"}}>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  ) : (
    <AppIntroSlider
      data={slides}
      onDone={() => setShowRealApp(true)}
      renderItem={({ item }) => {
        return (
          <View className=" justify-center items-center h-[100%] p-2 bg-primary">
            <Image
              source={item.image}
              style={{ width: SIZES.width - 80, height: 400 }}
              resizeMode="contain"
              className="bg-white rounded-full p-2 my-3"
            />
            <Text className="font-semibold text-lg text-green-900" style={{fontFamily:"poppins_semibold"}}> {item.title}</Text>
            <Text className="text-white text-sm px-5 my-3" style={{fontFamily:"poppins"}}>
              {item.description}
            </Text>
          </View>
        );
      }}
      activeDotStyle={{
        backgroundColor: "white",
        width: 20,
      }}
      renderSkipButton={() => buttonLabel("Skip")}
      renderDoneButton={() => buttonLabel("Done")}
    />
  )
  )
}
