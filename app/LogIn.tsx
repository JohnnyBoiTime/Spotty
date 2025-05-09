import { View, StyleSheet, Text } from "react-native";
import React, {useState} from 'react';
import { Card, Input,  Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// https://reactnativeelements.com/docs

// https://github.com/typescript-cheatsheets/react#reacttypescript-cheatsheets

// Simple log in screen, does not work

const LogIn: React.FC = ({navigation}: any) => {


  const [showPassword, setShowPassword] = useState(false);

  return (
      <LinearGradient
        colors ={['#800080', '#a60fa6', '#940694']} 
        locations={[0.3, 0.8, 0.99]} 
        style={styles.gradient}
      >
    <View  style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Card containerStyle={styles.card}>
        <Card.Title style={{ fontSize: 40}}>Jammi</Card.Title>
        <Card.Divider/>
        <Input 
          selectionColor={'white'}
          placeholderTextColor={'white'}
          inputStyle={{color: 'white'}}
          leftIcon={<Ionicons name='person' size={24} color='white'/>} 
          placeholder={process.env.DB_NAME} > 
        </Input>
        <Input 
          secureTextEntry={ showPassword }
          selectionColor={'white'}
          placeholderTextColor={'white'}
          inputStyle={{ color: 'white'}}
          rightIcon={<Ionicons name={showPassword ? 'eye-off' : 'eye'}
          onPress={() => setShowPassword(!showPassword)}
          size={24} 
          color='white' />}
          placeholder="Password">
            
          </Input>
      {/* navigation */}
      <Button onPress={() => navigation.navigate("home")}>Log in</Button>
      <Button onPress={() => navigation.navigate("forgotPassword")} type='clear'>Forgot Password</Button>
      <Button onPress={() => navigation.navigate("signUp")} type='clear'>Don't have an account? Sign up</Button>
      </Card>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'black',
    width: 300,
    height: 400,
  },
  cardTitle: {
    fontSize: 40,
    color: 'white',
  }
});

export default LogIn;
