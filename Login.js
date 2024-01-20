import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { NativeBaseProvider, Heading, Box, Button, Input, Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

/*
    // [purple, red, purple]
    const startingLocation = [0.0, 0.5, 0.0];
    const [transition, setTransition] = useState(startingLocation);

    useEffect(() => {
        const interval = setInterval(() => {

            const secondGradVal = transition[1] + 0.01;
            const thirdGradVal = transition[2] + 0.01;

            if (secondGradVal >= 0.91) {
                setTransition([0.0, 0.5, 0.0]);
                
            }
            else {
            
            setTransition((prevTransition) => [prevTransition[0]+0.01, secondGradVal, thirdGradVal]);
            }
        }, 100);
        return () => {
            clearInterval(interval);
        };
    }, [transition]);
    */




const LoginScreen = ({navigation}) => {

    const [showPassword, setShowPassword] = useState(false);

    const LoginInfo = async () => {
        try {

            const response = await axios.get('')
        }
    }

    return (
            <NativeBaseProvider>
                <LinearGradient
                colors ={['#800080', '#87ceeb' /*, '#800080'*/]} 
                locations={[0.1, 0.9] /* transition */}
                style={{ flex: 1}}
                >
                    <Heading size="xl" textAlign={'center'} paddingTop={100} color="white"> Welcome to Spotty! </Heading>
                    {/* Login Form */}
                    <Box alignItems="center" paddingTop={100}> 
                        <Input InputLeftElement={<Icon as={<Ionicons name="md-person-circle"/>} 
                        size={5}/>} 
                        color="white" 
                        mx="3" 
                        placeholder="Username" />
                        <Input type={showPassword ? "text" : "password"} 
                        mx="3" 
                        color="white"
                        InputRightElement={ <Pressable onPress={() => setShowPassword(!showPassword)}> 
                            <Icon as={<Ionicons name={showPassword ? "md-eye" : "md-eye-off"} />} size={5}/> 
                        </Pressable>} 
                        placeholder="Password" /> 
                    <Button onPress={() => navigation.navigate("MainApp")}>Log In </Button>
                    <Button colorScheme="primary" variant="link" onPress={() => navigation.navigate("CreateAccount")}>Create Account</Button>
                    </Box>
                </LinearGradient>
            </NativeBaseProvider>
    );
};


export default LoginScreen;

