import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "../Stack/Home";
import Register from "../Stack/Register";
import Login from "../Stack/Login";
import Main from "../Stack/Main";
import VegetablesPage from "../Stack/VegetablesPage";
import FruitsPage from "../Stack/FruitsPage";
import SingleItem from "../Stack/SingleItem";
import RecomendationPage from "../Stack/RecomendationPage";
import CartPage from "../Stack/cart/CartPage";
import EditProfile from "../Stack/Account/EditProfile";
import Promos from "../Stack/Account/Promos";
import FirstScreen from "../Stack/FirstScreen";
import Checkout from "../Stack/cart/Checkout";
import SucceFullScreen from "../Stack/cart/SucceFullScreen";
import TopBarOrderNavigator from "../Stack/MyOrder/TopNavigator";
import statistics from "../Stack/statistics/Statistics";
import { setAuthProfile, setAuthToken } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getItemAsync } from "expo-secure-store";
import { useEffect, useState } from "react";
import Account from "../BottomTab/Account";
import NotFound from "../Stack/NotFound";
// import
import SingleOrderPage from "../Stack/MyOrder/SingleOrderPage";


export const managerScreens =()=>{
  return(
    <Stack.Navigator initialRouteName= "statistics">
    <Stack.Screen
            name="statistics"
            component={statistics}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Account" component={Account} />
     
    </Stack.Navigator>
  )
} 

const Stack = createStackNavigator();
function StackNavigator() {
  const { authStatus, authProfile, authLoaded } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({});
  const getProfile = async () => {
    let userProfile = await getItemAsync("authProfile");
    setProfile(JSON.parse(userProfile));
  };
  useEffect(() => {
    getProfile();
  }, []);

  console.log("Profile from stack:", profile.role);

  return (
   <Stack.Navigator >
      {profile.role == "user" && (
        <>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Login" component={Login} />

          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Links" component={Home} />
          <Stack.Screen name="Vegetables" component={VegetablesPage} />
          <Stack.Screen name="Fruits" component={FruitsPage} />
          <Stack.Screen name="SingleItem" component={SingleItem} />
          <Stack.Screen name="Cart" component={CartPage} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Recommendation" component={RecomendationPage} />
          <Stack.Screen name="Promos" component={Promos} />
          <Stack.Screen name="FirstScreen" component={FirstScreen} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="SingleOrderPage" component={SingleOrderPage} />

          <Stack.Screen
            name="TopBarOrderNavigator"
            component={TopBarOrderNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SucceFullScreen"
            component={SucceFullScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}

      {profile.role == "manager" && (
        <>
          <Stack.Screen
            name="statistics"
            component={statistics}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Account" component={Account} />
        </>
      )}
      <Stack.Screen
            name="Home"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
    </Stack.Navigator>
  );
}

export default StackNavigator;
