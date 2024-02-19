import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { NativeBaseProvider, Heading, Box, Button, Input, Icon, View, VStack } from 'native-base';
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

    const [showData, setShowData] = useState(null);
    

    return (
            <NativeBaseProvider>
                <LinearGradient
                colors ={['#800080', '#a60fa6', '#940694']} 
                locations={[0.3, 0.8, 0.99] /* transition */}
                style={{ flex: 1}}
                >
                    <Heading fontSize={100} fontFamily='Arial' marginTop={20} textAlign={'center'} color="#bcb8c3"><Text>Jammi</Text></Heading>
                    <View style={styles.container}> 
                    <View style={styles.centerBox}>
                    {/* Login Form */}
                    <Input InputLeftElement={<Icon as={<Ionicons name="md-person-circle"/>} 
                        size={5}
                        marginLeft={1}/>} 
                        color="white" 
                        mx="3" 
                        placeholder="Username" />
                        <Input
                        margin={3} 
                        type={showPassword ? "text" : "password"} 
                        mx="3" 
                        color="white"
                        InputRightElement={ <Pressable onPress={() => setShowPassword(!showPassword)}> 
                            <Icon as={<Ionicons name={showPassword ? "md-eye" : "md-eye-off"} />} size={5} marginRight={1}/> 
                        </Pressable>} 
                        placeholder="Password" /> 
                    <Button onPress={() => navigation.navigate("MainApp")}>Log In </Button>
                    <Button variant="link" onPress={() => navigation.navigate("ForgotPassword")}><Text style={styles.text}>Forgot Password</Text></Button>
                    <Button variant="link" onPress={() => navigation.navigate("CreateAccount")}><Text style={styles.text}>Create Account</Text></Button>
                    
                    </View>
                    </View>
                </LinearGradient>
            </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    text : {
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 2,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerBox: {
        width: 340,
        height: 300,
        marginBottom: 350,
        borderColor: 'black',
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default LoginScreen;

