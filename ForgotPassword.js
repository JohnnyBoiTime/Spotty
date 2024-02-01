import React, { useState, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeBaseProvider, Heading, Box, Button, Input, Pressable, FormControl, View, Icon, VStack, Container } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';


// In Progress look for log in screen!

const ForgotPasswordScreen = ({navigation}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
            <NativeBaseProvider>
                <LinearGradient
                colors ={['#800080', '#87ceeb' /*, '#800080'*/]} 
                locations={[0.1, 0.9] /* transition */}
                style={{ flex: 1}}
                >
                    <Heading size="xl" textAlign={'center'} paddingTop={100} color="white"> Enter Recovery E-mail </Heading>
                    {/* Login Form */}
                    <Box alignItems="center" paddingTop={100}> 
                    <Input InputLeftElement={<Icon as={<Ionicons name="mail-sharp"/>} 
                        size={5}
                        marginLeft={1}/>} 
                        color="white" 
                        mx="3" 
                        placeholder="E-mail" />
                    <Button onPress={() => navigation.navigate("Login")}>Create Account </Button>
                    </Box>
                </LinearGradient>
            </NativeBaseProvider>
    );
};



const styles = StyleSheet.create({
    text : {
        color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerBox: {
        width: 300,
        height: 200,
        borderColor: 'black',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ForgotPasswordScreen;