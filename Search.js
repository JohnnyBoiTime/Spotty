import React, { useState, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeBaseProvider, Heading, Menu, Box, Button, Pressable, Input, View, Icon, FlatList } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

// Add something on the side of the input that allows you to search
// via albums, artist, songs, etc.

const Search = () => {

    const IconName = ["person-sharp", "disc-sharp", "musical-notes-sharp"];
    const [useIcon, setUseIcon] = useState(IconName[0]);

    return <LinearGradient
        colors ={['#32174d', '#87ceeb' /*, '#800080'*/]} 
        locations={[1, 1] /* transition */}
        style={{ flex: 1}}
        >
            <Heading size="xl" textAlign={'center'} paddingTop={8} color="white" ></Heading>
            <Input 
            InputRightElement={<Menu w="190" type="radio" trigger={triggerProps => {
                return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <Icon as={<Ionicons name={useIcon}/>} 
                    size={5}
                    />
                </Pressable>;
            }}>
                <Menu.OptionGroup defaultValue="person-sharp" type="radio">
                <Menu.ItemOption value="person-sharp">Search by Artist</Menu.ItemOption>
                <Menu.ItemOption value="disc-sharp">Search by Album</Menu.ItemOption>
                <Menu.ItemOption value="musical-notes-sharp">Search by Song</Menu.ItemOption>
                </Menu.OptionGroup>
                </Menu>    
            }  
            color="white"
            mx="3" 
            placeholder="Search for artist" />
        </LinearGradient>
    
};

export default Search;