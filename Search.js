import React, { useState, useEffect } from 'react';
import { StyleSheet, Text} from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { NativeBaseProvider, Heading, Menu, Box, Button, Pressable, Input, View, Icon, List, composeEventHandlers } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

// Add something on the side of the input that allows you to search
// via albums, artist, songs, etc.

const Search = () => {

    const IconName = ["person-sharp", "disc-sharp", "musical-notes-sharp"];
    const [useIcon, setUseIcon] = useState(IconName[0]);
    const [searchResults, setSearchResults] = useState([]);

    const changeIcon = (value) => {
        setUseIcon(value);
        console.log(value);
    };

    const placeHolderName = {
        'person-sharp': 'Search by artist',
        'disc-sharp': 'Search by Album',
        'musical-notes-sharp': 'Search by Song',
    };

    return <LinearGradient
        colors ={['#32174d', '#87ceeb' /*, '#800080'*/]} 
        locations={[1, 1] /* transition */}
        style={{ flex: 1}}
        >
            <Heading size="xl" textAlign={'center'} paddingTop={8} color="white" ></Heading>
            <Input 
            InputRightElement={
            <Box><Menu backgroundColor="#313336" w="190" closeOnSelect={false} trigger={triggerProps => {
                return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <Icon as={<Ionicons name={useIcon}/>} 
                    size={5}
                    />
                </Pressable>;
                
            }}>
                <Menu.OptionGroup title="Search by:" value={useIcon} onChange={(value) => changeIcon(value)} defaultValue="person-sharp" type="radio" >
                <Menu.ItemOption value="person-sharp"><Text style={styles.textColor}>Artist</Text></Menu.ItemOption>
                <Menu.ItemOption value="disc-sharp"><Text style={styles.textColor}>Album</Text></Menu.ItemOption>
                <Menu.ItemOption value="musical-notes-sharp"><Text style={styles.textColor}>Song</Text></Menu.ItemOption>
                </Menu.OptionGroup>
                </Menu>
                </Box> 
            }  
            color="white"
            mx="3" 
            placeholder={placeHolderName[useIcon]} 
            />
            <List mx="3" borderColor='transparent'>
                <Text></Text>
             </List>
        </LinearGradient>
    
};

const styles = StyleSheet.create({
    textColor: {
        color: 'white',
    },
});

export default Search;
