import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av';
import { NativeBaseProvider, Heading, Box, Image, VStack, Menu, Pressable,  Input, View, Text, Icon, Button, ScrollView} from 'native-base';
import { useSharedValue, withTiming, useAnimatedStyle, withRepeat } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';



// Make it so when you tap a song, it changes color to indicate that the song is playing. DONE 
// Add a play pause button

const InsideTheAlbum = () => {

    const song = React.useRef(new Audio.Sound());
    const [colorOfSong, setColorOfSong] = useState('white');
    const [colorOfSong1, setColorOfSong1] = useState('white');
    const [colorOfSong2, setColorOfSong2] = useState('white');
    const [colorOfSong3, setColorOfSong3] = useState('white');
    const [colorOfSong4, setColorOfSong4] = useState('white');
    const [colorOfSong5, setColorOfSong5] = useState('white');
    const [colorOfSong6, setColorOfSong6] = useState('white');
    const [colorOfSong7, setColorOfSong7] = useState('white');
    const [colorOfSong8, setColorOfSong8] = useState('white');
    const [colorOfSong9, setColorOfSong9] = useState('white');
 //   const currentSong = useSelector((state) => state.currentSong.name);
 //   const dispatch = useDispatch();

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

    // Function courtesy of Kartikey from this post: https://stackoverflow.com/questions/68042313/pausing-react-native-expo-audio
    async function pauseSong(songName) {
        try {
            const isSongPlaying = await song.current.getStatusAsync();
            if (isSongPlaying.isLoaded) {
                if (isSongPlaying.isPlaying === true) {
                    song.current.pauseAsync();
                }
            }
        } catch (error)
        {

        }
    };

        // Function courtesy of Kartikey from this post: https://stackoverflow.com/questions/68042313/pausing-react-native-expo-audio
    async function playSong(songName) {
        try {
            const isSongPlaying = await song.current.getStatusAsync();
            if (isSongPlaying.isLoaded) {
                if (isSongPlaying.isPlaying === false) {
                    song.current.playAsync();
                }
            }
        }
        catch (error) {

        }
    }


    async function startSong(songName) {

        setColorOfSong('black');
        setColorOfSong1('black');
        setColorOfSong2('black');
        setColorOfSong3('black');
        setColorOfSong4('black');
        setColorOfSong5('black');
        setColorOfSong6('black');
        setColorOfSong7('black');
        setColorOfSong8('black');
        setColorOfSong9('black');

        if (song) {
            await song.stopAsync();
            await song.unloadAsync();
        }
        const {sound} = await Audio.Sound.createAsync(songList[songName]);
        setSong(sound)
  //      dispatch(setCurrentSong(song));
  switch (songName) {
    case 'BeautifulWorld':
        setColorOfSong(!colorOfSong);
        break;
    case 'Excuse':
        setColorOfSong1(!colorOfSong1);
        break;
    case 'AnalogSentimentalism':
        setColorOfSong2(!colorOfSong2);
        break;
    case 'WhiteCieling':
        setColorOfSong3(!colorOfSong3);
        break;
    case 'ToSeeTheNextPartOfTheDream':
        setColorOfSong4(!colorOfSong4);
        break;
    case 'AgeOfFluctuation':
        setColorOfSong5(!colorOfSong5);
         break;
    case 'YouthRebellion':
        setColorOfSong6(!colorOfSong6);
        break;
    case 'ExtraStory':
        setColorOfSong7(!colorOfSong7);
        break;
    case 'Chicken':
        setColorOfSong8(!colorOfSong8);
        break;
    case 'ICanFeelMyHeartTouchingYou':
        setColorOfSong9(!colorOfSong9);
        break;
    default:
        break;    

        }

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
          <Heading marginLeft={135}> <Text style={styles.songNames} color='white' justifyItems='center'>Parannoul</Text></Heading>
          <ScrollView>
          <VStack alignItems='flex-start'>
          <Button background='transparent' width='100%' onPress={() => startSong("BeautifulWorld", )} height={10} style={styles.songButton}> <Text style={styles.songNames} color={  colorOfSong? 'white' : 'black'}>아름다운 세상 (Beautiful World) </Text></Button>
          <Button background='transparent' width='100%' onPress={() => startSong("Excuse")} height={10} style={styles.songButton}> <Text style={styles.songNames} color={ colorOfSong1? 'white' : 'black'}>변명 (Excuse)</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => startSong("AnalogSentimentalism")} height={10} style={styles.songButton}> <Text style={styles.songNames} color={ colorOfSong2 ? 'white' : 'black'}>아날로그 센티멘탈리즘 (Analog Sentimentalism)</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => startSong("WhiteCieling")} height={10} style={styles.songButton}> <Text style={styles.songNames} color={ colorOfSong3 ? 'white' : 'black'}>흰천장 (White Ceiling)</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => startSong("ToSeeTheNextPartOfTheDream")} height={10} style={styles.songButton}> <Text style={styles.songNames} color={ colorOfSong4 ? 'white' : 'black'}>To See the Next Part of the Dream</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => startSong("AgeOfFluctuation")} height={10} style={styles.songButton}> <Text style={styles.songNames} color={ colorOfSong5 ? 'white' : 'black'}>격변의 시대 (Age of Fluctuation)</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => startSong("YouthRebellion")} height={10} style={styles.songButton}> <Text style={styles.songNames} color={ colorOfSong6 ? 'white' : 'black'}>청춘반란 (Youth Rebellion)</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => startSong("ExtraStory")} height={10} style={styles.songButton}> <Text style={styles.songNames} color={ colorOfSong7 ? 'white' : 'black'}>엑스트라 일대기 (Extra Story)</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => startSong("Chicken")} height={10} style={styles.songButton}> <Text style={styles.songNames} color={ colorOfSong8 ? 'white' : 'black'}>Chicken</Text> </Button>
          <Button background='transparent' width='100%' onPress={() => startSong("ICanFeelMyHeartTouchingYou")} height={10} style={styles.songButton}> <Text style={styles.songNames} color={ colorOfSong9 ? 'white' : 'black'}>I Can Feel My Heart Touching You</Text> </Button>
          </VStack>
          {song.isPlaying ? (
            <Button leftIcon={<Icon as={Ionicons} name='play-circle-sharp' />} title='Pause' onPress={() => pauseSong(song)} > </Button>
          ) : (
            <Button leftIcon={<Icon as={Ionicons} name='pause-circle-sharp' />} title='play' onPress={() => playSong(song)}></Button>
          )}
          </ScrollView>
      </LinearGradient>
  );
};
const styles = StyleSheet.create({
    songNames: {
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