import React, { useState, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeBaseProvider, Heading, Box, Button, Input, View, Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {
    return (
        <LinearGradient
        colors ={['#32174d', '#87ceeb' /*, '#800080'*/]} 
        locations={[1, 1] /* transition */}
        style={{ flex: 1}}
        >
            <Heading size="xl" textAlign={'center'} paddingTop={8} color="black" ></Heading>
            <Text>
                Home
            </Text>
        </LinearGradient>
    );
};

export default Home;