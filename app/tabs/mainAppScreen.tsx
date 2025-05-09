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
import ArtistPageContents from './artistPage';

const MainAppScreen: React.FC = () => {
    const Tabs = createBottomTabNavigator();

    return (
        
            <NavigationContainer independent={true}>
                <View style={{flex: 1,}}>
                { /* Render music player above bar logic thanks to: https://stackoverflow.com/questions/74834004/react-native-how-to-show-an-element-above-bottom-tab-navigator */}
                <Tabs.Navigator
                tabBar={(props) => (
                    <>
                    <View style={{backgroundColor: 'black', position: 'absolute', height: 0}}>
                        <MusicPlayer/>
                    </View>
                    <BottomTabBar style={{borderColor: 'black'}} {...props} />
                    </>
                )} 
                screenOptions={{
                    headerShown: false, 
                    tabBarStyle: {backgroundColor: 'black'}
                }}>
                    <Tabs.Screen name ="Main Screen" component={HomeScreen} options={{tabBarIcon: () => ( <Ionicons name="home" size={38} color="blue"/>) }}/>
                    <Tabs.Screen name ="Search For Music" component={Search} options={{tabBarIcon: () => ( <Ionicons name="search" size={38} color="blue"/>) }}/>
                    <Tabs.Screen name ="Playlists" component={PlayLists} options={{tabBarIcon: () => ( <MaterialIcons name="library-music" size={38} color="blue"/>) }}/>
                    <Tabs.Screen name ="AlbumContents" component={InsideAlbum} options={{ tabBarButton: () => null}}/>
                    <Tabs.Screen name ="PlaylistContents" component={InsidePlaylist} options={{ tabBarButton: () => null}}/>
                    <Tabs.Screen name='InsideArtist' component={ArtistPageContents} options={{ tabBarButton: () => null }}/>                   
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
