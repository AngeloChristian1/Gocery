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

export const AuthNavigation = () => {

  const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
      </Stack.Navigator>
    );
  };


  export default RootNavigation = () => {
const dispatch = useDispatch()
  const { authStatus, authLoaded } = useSelector((state) => state.auth);

  const handleAuth = async ()=>{
    let token = await getItemAsync("authToken")
    // console.log("authtoken__token:", token)

    if(token){
      dispatch(setAuthStatus(true));
      dispatch(setAuthToken(token));
    }
    dispatch(setAuthLoaded(true));

  }
  useEffect(() => {
    handleAuth();
  }, []); 
  if(!authLoaded){
    return null
  }

    return( authStatus ?(<TabNavigator/>): (<AuthNavigation/>) )
   
  };
  

  