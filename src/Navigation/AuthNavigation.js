import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StackNavigator from "./StackNavigation";
import Login from "../Stack/Login";
import Register from "../Stack/Register";
import TabNavigator from "./TabNavigation";

import { View, Text } from "react-native";
// import { MainNavigation } from "./mainNavigation";

export const AuthNavigation = () => {
    return (
      <Navigator>
        <Screen
          name="Login"
          component={Login}
        />
      </Navigator>
    );
  };



  export default RootNavigation = () => {
    return true ? <TabNavigator /> : <AuthNavigation />;
  };
  