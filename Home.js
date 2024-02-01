import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, Image} from 'react-native';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, useSharedValue, withTiming, useAnimatedStyle, withRepeat } from 'react-native-reanimated';
import { NativeBaseProvider, Heading, HStack, Box, Button, Input, FormControl, View, Icon, VStack, Container, Pressable } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';


// In Progress look for log in screen!

const Home = () => {

    useEffect(() => {
        
    })

    const [visible, setVisible] = useState(true);

    const navigation = useNavigation();

    const translateX = useSharedValue(0);
    
    const scale = useSharedValue(0);

    const ImageMove = Animated.createAnimatedComponent(Image);
    const FadeInList = Animated.createAnimatedComponent(ScrollView);

    const moveImage = () => {
        translateX.value += 50;

        setVisible(false);
        scale.value += 50

        setTimeout(() => {
            navigation.navigate('AlbumContents')
        }, 300)
      };

      const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(translateX.value * 3) }],
      }));
    
    return (
        <LinearGradient
        colors ={['#502fb7', '#5e3ec2' /*, '#800080'*/]} 
        locations={[0.8, 1] /* transition */}
        style={{ flex: 1}}
        >
        <Heading marginTop={20}>Favorites:</Heading>
        <VStack space={5}>
        <FadeInList horizontal={true} entering={FadeIn.duration(1000)} exiting={FadeOut}>
        <HStack space={3} justifyContent="center" >
            <Pressable onPress={ /*() => {navigation.navigate('AlbumContents')*/ moveImage}>
          <ImageMove 
            
            source={require('./assets/Dream.jpg')}
            style={[styles.imageInfo, animatedStyles]}
            />
            </Pressable>
            {visible && (
            <HStack space={3}>
            <Image source={require('./assets/Computer.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Magic.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Crossroads.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Panchiko.jpg')} style={styles.imageInfo}/>
            </HStack>
            )}
            </HStack>
            </FadeInList>
            <Box alignContent='center'>
            <Heading>Whats New: </Heading>
            <FadeInList horizontal={true} entering={FadeIn.duration(1000)} exiting={FadeOut}>
            <HStack space={3}>
            <Image source={require('./assets/Computer.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Magic.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Crossroads.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Panchiko.jpg')} style={styles.imageInfo}/>
            </HStack>
            </FadeInList>
            </Box>
            <Box alignContent='center'>
            <Heading>Recommended: </Heading>
            <FadeInList horizontal={true} entering={FadeIn.duration(1000)} exiting={FadeOut}>
            <HStack space={3}>
            <Image source={require('./assets/Computer.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Magic.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Crossroads.jpg')} style={styles.imageInfo}/>
            <Image source={require('./assets/Panchiko.jpg')} style={styles.imageInfo}/>
            </HStack>
            </FadeInList>
            </Box>
            </VStack>
        </LinearGradient>
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
    },
    imageInfo: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
    },
});

export default Home;
