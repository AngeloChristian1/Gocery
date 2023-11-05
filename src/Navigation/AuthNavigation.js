import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StackNavigator from "./StackNavigation";
import Login from "../Stack/Login";
import Register from "../Stack/Register";
import TabNavigator from "./TabNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "react-native";
import { View, Text } from "react-native";
import FirstScreen from "../Stack/FirstScreen";
import { useSelector, useDispatch } from "react-redux";
import { setAuthLoaded, setAuthProfile, setAuthStatus, setAuthToken } from "../redux/authSlice";
import { getItemAsync } from "expo-secure-store";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export const AuthNavigation = () => {

  const Stack = createStackNavigator();
    return (
      <Stack.Navigator><Stack.Screen name="FirstScreen" component={FirstScreen} options={{
          headerShown: false,
        }}/>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Register" component={Register}  options={{
          headerShown: false,
        }}/>
        
      </Stack.Navigator>
    );
  };


  export default RootNavigation = () => {
    // SplashScreen.preventAutoHideAsync();
const dispatch = useDispatch()
  const { authStatus, authLoaded } = useSelector((state) => state.auth);

  const handleAuth = async ()=>{
    let token = await getItemAsync("authToken")
    let user = await getItemAsync("authProfile");
    // console.log("authtoken__token:", token)

    if(token){
      dispatch(setAuthStatus(true));
      dispatch(setAuthToken(token));
      dispatch(setAuthProfile(JSON.parse(user)));

    }
    dispatch(setAuthLoaded(true));
    // SplashScreen.hideAsync();
  }
  useEffect(() => {
    handleAuth();
  }, []); 
  if(!authLoaded){
    return null
  }

    return( authStatus ?(<StackNavigator/>): (<AuthNavigation/>) )
   
  };
  

  