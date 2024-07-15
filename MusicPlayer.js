import React from 'react';
import { Ionicons } from '@expo/vector-icons'
import {   Divider,  View, Text, Icon, Button, Slider, HStack} from 'native-base';
import { useMusicPlayer } from './Contexts.js/MusicPlayerContext';


// Music player component
const MusicPlayer = () => {
    const {
        nameOfSong,
        isPlaying,
        playbackPos,
        playbackDuration,
        resumeSong,
        pauseSong,
        saveSong,
        skipForward,
        goBack,
        scroller,
        time,
    } = useMusicPlayer();

    return (
            <View backgroundColor='black'>
                {/* Show player if song is playing */}
            {isPlaying || nameOfSong ? (
            <View>
            <Divider></Divider> 
            <Text textAlign='center' color={'white'}>{nameOfSong} ({time(playbackPos)} / {time(playbackDuration)})</Text> 
            {/* Scroll through currently playing song */}
            <Slider marginLeft={12} w="3/4" value={playbackPos / playbackDuration || 0} minValue={0} maxValue={1} onChange={scroller} accessibilityLabel="seek" step={0.01}>
                <Slider.Track >
                    <Slider.FilledTrack />
                </Slider.Track>
            <Slider.Thumb/>
            </Slider>
            
            {/* Play, pause, skip, go back a song */}
            <HStack space={4} justifyContent="center" backgroundColor='transparent'>
                <Button leftIcon={<Icon as={Ionicons} name='play-skip-back-sharp'/>} marginRight={20} onPress={goBack}></Button>
                {/* Change icon if playing or pausing */}
                {isPlaying ? ( 
                    <Button leftIcon={<Icon as={Ionicons} name='pause-circle-sharp' />} onPress={pauseSong}></Button>
                    ) : (
                    <Button leftIcon={<Icon as={Ionicons} name='play-circle-sharp' />} onPress={resumeSong} />
                )}
                <Button leftIcon={<Icon as={Ionicons} name='save-sharp' />} onPress={saveSong}></Button>
                <Button leftIcon={<Icon as={Ionicons} name='play-skip-forward-sharp'/>} marginLeft={20} onPress={skipForward}></Button>
            </HStack>
            </View>
            ) : (
            <Text></Text>
            )}
          </View>
    );
};

export default MusicPlayer;