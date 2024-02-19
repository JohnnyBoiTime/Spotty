import React, { useState, useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeBaseProvider, Heading, Box, Button, Input, Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';


const CreateAccountScreen = ({navigation}) => {

    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);

    return (
            <NativeBaseProvider>
                <LinearGradient
                colors ={['#800080', '#87ceeb' /*, '#800080'*/]} 
                locations={[0.1, 0.9] /* transition */}
                style={{ flex: 1}}
                >
                    <Heading size="xl" textAlign={'center'} paddingTop={100} color="white"> Create Account </Heading>
                    {/* Login Form */}
                    <Box alignItems="center" paddingTop={100}> 
                        <Input InputLeftElement={<Icon as={<Ionicons name="md-person-circle"/>} 
                        size={5}
                        marginLeft={1}/>} 
                        color="white" 
                        mx="3" 
                        placeholder="Username" />
                        <Input InputLeftElement={<Icon as={<Ionicons name="mail-sharp"/>} 
                        size={5}
                        marginLeft={1}/>} 
                        color="white" 
                        mx="3" 
                        placeholder="E-mail" />
                        <Input type={showPassword ? "text" : "password"} 
                        mx="3" 
                        color="white"
                        InputRightElement={ <Pressable onPress={() => setShowPassword(!showPassword)}> 
                            <Icon as={<Ionicons name={showPassword ? "md-eye" : "md-eye-off"} />} size={5} marginRight={1}/> 
                        </Pressable>} 
                        placeholder="Password" /> 
                        <Input type={showPassword ? "text" : "password"} 
                        mx="3" 
                        color="white"
                        InputRightElement={ <Pressable onPress={() => setShowPassword1(!showPassword1)}> 
                            <Icon as={<Ionicons name={showPassword1 ? "md-eye" : "md-eye-off"} />} size={5} marginRight={1}/> 
                        </Pressable>} 
                        placeholder="Re-Enter Password"/> 
                    <Button onPress={() => navigation.navigate("Login")}>Create Account </Button>
                    </Box>
                </LinearGradient>
            </NativeBaseProvider>
    );
};

export default CreateAccountScreen;