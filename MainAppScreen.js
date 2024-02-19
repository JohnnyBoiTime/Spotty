import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Home from './Home';
import Search from './Search';
import Saved from './Saved';
import InsideTheAlbum from './AlbumContents';
import { NativeBaseProvider, Heading, Box, Button, Input, View, Icon } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';


const MainAppScreen = () => {

const Tabs = createBottomTabNavigator();

// const currentSong = useSelector((state) => state.currentSong);

    return (
        <NativeBaseProvider>
             <LinearGradient
        colors ={['#800080', '#800080' /*, '#800080'*/]} 
        locations={[0.1, 1] /* transition */}
        >
        </LinearGradient>
        <NavigationContainer independent={true}>
            <Tabs.Navigator screenOptions={{
                headerShown: false, 
                tabBarStyle: {backgroundColor: 'black'}
                }}>
                <Tabs.Screen name ="Home" component={Home} options={{tabBarIcon: () => ( <Ionicons name="md-home" size={38} color="blue"/>) }}/>
                <Tabs.Screen name ="Search For Music" component={Search} options={{tabBarIcon: () => ( <Ionicons name="search" size={38} color="blue"/>) }}/>
                <Tabs.Screen name ="Saved Music" component={Saved} options={{tabBarIcon: () => ( <MaterialIcons name="library-music" size={38} color="blue"/>) }}/>
                <Tabs.Screen name ="AlbumContents" component={InsideTheAlbum} options={{ tabBarButton: () => null}}/>
            </Tabs.Navigator>
             </NavigationContainer>
            </NativeBaseProvider>
    );
};


export default MainAppScreen;