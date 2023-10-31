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

const Stack = createStackNavigator();

function StackNavigator() {
  return (
   
    <Stack.Navigator
    
    >
    <Stack.Screen
    name="Home"
    component={Main}
    options={{
      headerShown: false,
    }}
  />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={Main}  options={{
        headerShown: false,
      }}/>
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
    </Stack.Navigator>
   
  );
}

export default StackNavigator;
