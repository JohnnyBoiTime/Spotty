import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { AudioProvider } from "./context";
import LogIn from './LogIn';
import SignUp from "./signUp";
import ForgotPassword from "./forgotPassword";
import store from '../store/index';
import MainAppScreen from "./tabs/mainAppScreen";


const Stack = createStackNavigator();

const App = () => {
  return (
    // Provides store to app
    <Provider store={store}> 
      <AudioProvider>
        <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="login" component={LogIn}/>
          <Stack.Screen name="home" component={MainAppScreen} />
          <Stack.Screen name="signUp" component={SignUp}/>
          <Stack.Screen name="forgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
        </NavigationContainer>
      </AudioProvider>
    </Provider>
  );
}

export default App;
