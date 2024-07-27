import { View, StyleSheet } from "react-native";
import React, {useState} from 'react';
import { Card, Input } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

// https://reactnativeelements.com/docs


// Simple sign up screen, does not work

const SignUp: React.FC = ({navigation}: any) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
      <LinearGradient
        colors ={['#800080', '#a60fa6', '#940694']} 
        locations={[0.3, 0.8, 0.99]} 
        style={styles.gradient}
      >
    <View  style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Card containerStyle={styles.card}>
        <Card.Title style={{fontSize: 40}}>Jammi</Card.Title>
        <Card.Divider/>
        <Input 
          selectionColor={'white'}
          placeholderTextColor={'white'}
          inputStyle={{color: 'white'}}
          leftIcon={<Ionicons name='mail' size={24} color='white'/>} 
          placeholder="E-mail" > 
        </Input>
        <Input 
          selectionColor={'white'}
          placeholderTextColor={'white'}
          inputStyle={{color: 'white'}}
          leftIcon={<Ionicons name='person' size={24} color='white'/>} 
          placeholder="Username" > 
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
          placeholder="Password"></Input>
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
    height: 500,
  },
  cardTitle: {
    fontSize: 40,
    color: 'white',
  }
});

export default SignUp;