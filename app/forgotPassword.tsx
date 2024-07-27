import { Text, View, StyleSheet } from "react-native";
import React, {useState} from 'react';
import { Card, Input, Button } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
// https://reactnativeelements.com/docs

// Simple log in screen, does not work

const ForgotPassword: React.FC = () => {

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
        <Text style={styles.text}>Please enter email associated with your account</Text>
        <Input 
          selectionColor={'white'}
          placeholderTextColor={'white'}
          inputStyle={{color: 'white'}}
          leftIcon={<Ionicons name='mail' size={24} color='white'/>} 
          placeholder="E-mail" > 
        </Input>
       
      <Button>Send E-mail</Button> 
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
  },
  text: {
    color: 'white',
  },
});

export default ForgotPassword;