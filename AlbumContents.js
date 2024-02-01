import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { NativeBaseProvider, Heading, Box, Image, Button, VStack, Menu, Pressable,  Input, View, Text, Icon, ScrollView} from 'native-base';
import { useSharedValue, withTiming, useAnimatedStyle, withRepeat } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const InsideTheAlbum = () => {

    const [song, setSong] = useState();

    useEffect(() => {
        return () => {
            if (song) {
                song.stopAsync();
                song.unloadAsync();
            }
        };
    }, [song]);

    const songList = {
        BeautifulWorld: require('./assets/BeautifulWorld.mp3'),
        Excuse: require('./assets/Excuse.mp3'),
        AnalogSentimentalism: require('./assets/AnalogSentimentalism.mp3'),
        WhiteCieling: require('./assets/WhiteCieling.mp3'),
        ToSeeTheNextPartOfTheDream: require('./assets/ToSeeTheNextPartOfTheDream.mp3'),
        AgeOfFluctuation: require('./assets/AgeOfFluctuation.mp3'),
        YouthRebellion: require('./assets/YouthRebellion.mp3'),
        ExtraStory: require('./assets/ExtraStory.mp3'),
        Chicken: require('./assets/Chicken.mp3'),
        ICanFeelMyHeartTouchingYou: require('./assets/ICanFeelMyHeartTouchingYou.mp3'),
    }

    async function playSong(songName) {

        if (song) {
            await song.stopAsync();
            await song.unloadAsync();
        }
        const {sound} = await Audio.Sound.createAsync(songList[songName]);
        setSong(sound);
        await sound.playAsync();
        console.log("song be playing!");
    };

    return (
      <LinearGradient
      colors ={['#32174d', '#87ceeb' /*, '#800080'*/]} 
      locations={[1, 1] /* transition */}
      style={{ flex: 1}}
      >
          <Heading size="xl" textAlign={'center'} paddingTop={8} color="white" >To See the Next Part of the Dream</Heading>
          <Image source={require('./assets/Dream.jpg')} style={styles.imageInfo}/>
          <Heading marginLeft={135}> <Text style={styles.songNames} justifyItems='center'>Parannoul</Text></Heading>
          <ScrollView>
          <VStack alignItems='flex-start'>
          <Button background='transparent' width='100%' onPress={() => playSong("BeautifulWorld")} height={10} style={styles.songButton}> <Text style={styles.songNames}>아름다운 세상 (Beautiful World) </Text></Button>
          <Button background='transparent' width='100%' onPress={() => playSong("Excuse")} height={10} style={styles.songButton}> <Text style={styles.songNames}>변명 (Excuse)</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => playSong("AnalogSentimentalism")} height={10} style={styles.songButton}> <Text style={styles.songNames}>아날로그 센티멘탈리즘 (Analog Sentimentalism)</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => playSong("WhiteCieling")} height={10} style={styles.songButton}> <Text style={styles.songNames}>흰천장 (White Ceiling)</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => playSong("ToSeeTheNextPartOfTheDream")} height={10} style={styles.songButton}> <Text style={styles.songNames}>To See the Next Part of the Dream</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => playSong("AgeOfFluctuation")} height={10} style={styles.songButton}> <Text style={styles.songNames}>격변의 시대 (Age of Fluctuation)</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => playSong("YouthRebellion")} height={10} style={styles.songButton}> <Text style={styles.songNames}>청춘반란 (Youth Rebellion)</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => playSong("ExtraStory")} height={10} style={styles.songButton}> <Text style={styles.songNames}>엑스트라 일대기 (Extra Story)</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => playSong("Chicken")} height={10} style={styles.songButton}> <Text style={styles.songNames}>Chicken</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => playSong("ICanFeelMyHeartTouchingYou")} height={10} style={styles.songButton}> <Text style={styles.songNames}>I Can Feel My Heart Touching You</Text> </Button>
          </VStack>
          </ScrollView>
      </LinearGradient>
  );
};
const styles = StyleSheet.create({
    songNames: {
        color: 'white',
        textAlign: 'left',
    },
    imageInfo: {
        width: 200,
        height: 200,
        marginLeft: 100,
        resizeMode: 'cover',
    },
    songButton: {
        justifyContent: 'flex-start',
        paddingLeft: 10,
    }
});

export default InsideTheAlbum;