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
import SingleOrderPage from "../Stack/MyOrder/SingleOrderPage";
import TabNavigator from "./TabNavigation";
import { ManagerTabVavigator } from "./TabNavigation";
import { UserTabNavigator } from "./TabNavigation";
import Visualisation from "../Stack/statistics/Visualisation";

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


  console.log(authProfile, "Auth profile in stack");
  if (!authLoaded) {
    return null
  }

  return (
   <Stack.Navigator initialRouteName="Main">
      {authProfile?.role == "user" && (
        <>
          <Stack.Screen name="Main" component={TabNavigator} options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="Home" component={TabNavigator} options={{
            headerShown: false,
          }}/>

          <Stack.Screen name="Links" component={Home} />
          <Stack.Screen name="Vegetables" component={VegetablesPage} options={{ headerShown: false,}}/>
          <Stack.Screen name="Fruits" component={FruitsPage} />
          <Stack.Screen name="SingleItem" component={SingleItem} options={{ headerShown: false,}}/>
          <Stack.Screen name="Cart" component={CartPage} options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Recommendation" component={RecomendationPage} />
          <Stack.Screen name="Promos" component={Promos} />
         
          <Stack.Screen name="Checkout" component={Checkout} options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="SingleOrderPage" component={SingleOrderPage} options={{
            headerShown: false,
          }}/>
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

      {authProfile?.role == "manager" && (
        <>
          <Stack.Screen
            name="statistics"
            component={ManagerTabVavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Visualisation" component={Visualisation} />
        </>
      )}
      
    </Stack.Navigator>
  );
}

export default StackNavigator;


   // <Stack.Screen name="Login" component={Login} options={{
          //   headerShown: false,
          // }}/>
          // <Stack.Screen name="Register" component={Register} options={{
          //   headerShown: false,
          // }}/>