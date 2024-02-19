import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import React, { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Login';
import MainAppScreen from './MainAppScreen';
import CreateAccountScreen from './CreateAccount';
import ForgotPasswordScreen from './ForgotPassword';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="MainApp" component={MainAppScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
