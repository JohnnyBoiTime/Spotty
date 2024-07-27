import React from 'react';
import { View, StyleSheet } from 'react-native';
import MusicPlayer from '../musicPlayer';
import { NavigationContainer} from '@react-navigation/native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import HomeScreen from './homeScreen';
import InsideAlbum from './albumContents';
import Search from './search';
import PlayLists from './playLists';
import InsidePlaylist from './playlistContent';

const MainAppScreen: React.FC = () => {
    const Tabs = createBottomTabNavigator();

    return (
        
            <NavigationContainer independent={true}>
                <View style={{flex: 1,}}>
                { /* Render music player above bar logic thanks to: https://stackoverflow.com/questions/74834004/react-native-how-to-show-an-element-above-bottom-tab-navigator */}
                <Tabs.Navigator
                tabBar={(props) => (
                    <>
                    <View style={{backgroundColor: 'rgb(138, 0, 138)', padding: 0}}>
                    <MusicPlayer/>
                    </View>
                    <BottomTabBar {...props} />
                    </>
                )} 
                screenOptions={{
                    headerShown: false, 
                    tabBarStyle: {backgroundColor: 'black'},
                }}>
                    <Tabs.Screen name ="Main Screen" component={HomeScreen} options={{tabBarIcon: () => ( <Ionicons name="home" size={38} color="blue"/>) }}/>
                    <Tabs.Screen name ="Search For Music" component={Search} options={{tabBarIcon: () => ( <Ionicons name="search" size={38} color="blue"/>) }}/>
                    <Tabs.Screen name ="Playlists" component={PlayLists} options={{tabBarIcon: () => ( <MaterialIcons name="library-music" size={38} color="blue"/>) }}/>
                    <Tabs.Screen name ="AlbumContents" component={InsideAlbum} options={{ tabBarButton: () => null}}/>
                    <Tabs.Screen name ="PlaylistContents" component={InsidePlaylist} options={{ tabBarButton: () => null}}/>
                </Tabs.Navigator>
                </View>
                </NavigationContainer>
    );
};

export default MainAppScreen;


const styles = StyleSheet.create({
    gradient: {
      flex: 1,
    },
 
  });