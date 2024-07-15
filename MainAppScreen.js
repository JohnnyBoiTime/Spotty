import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Search from './Search';
import Saved from './Saved';
import InsideTheAlbum from './AlbumContents';
import MusicPlayer from './MusicPlayer';
import { NativeBaseProvider,  View } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';


// Shows tabs at bottom and music player when it appears

const MainAppScreen = () => {

    const Tabs = createBottomTabNavigator();

    return (
        <NativeBaseProvider>
            <LinearGradient
                colors ={['#800080', '#800080' /*, '#800080'*/]} 
                locations={[0.1, 1] /* transition */}
            >
            </LinearGradient>
            <NavigationContainer independent={true}>
                <View style={{flex: 1}}>
                    { /* Render music player above bar logic thanks to: https://stackoverflow.com/questions/74834004/react-native-how-to-show-an-element-above-bottom-tab-navigator */}
                <Tabs.Navigator
                tabBar={(props) => (
                    <>
                    <MusicPlayer/>
                    <BottomTabBar {...props} />
                    </>
                )} 
                screenOptions={{
                    headerShown: false, 
                    tabBarStyle: {backgroundColor: 'black'},
                }}>
                    <Tabs.Screen name ="Home" component={Home} options={{tabBarIcon: () => ( <Ionicons name="home" size={38} color="blue"/>) }}/>
                    <Tabs.Screen name ="Search For Music" component={Search} options={{tabBarIcon: () => ( <Ionicons name="search" size={38} color="blue"/>) }}/>
                    <Tabs.Screen name ="Saved Music" component={Saved} options={{tabBarIcon: () => ( <MaterialIcons name="library-music" size={38} color="blue"/>) }}/>
                    <Tabs.Screen name ="AlbumContents" component={InsideTheAlbum} options={{ tabBarButton: () => null}}/>
                </Tabs.Navigator>
                </View>
                </NavigationContainer>
                </NativeBaseProvider>
    );
};


export default MainAppScreen;
