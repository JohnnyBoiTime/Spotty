import { View, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store/";
import { Text, CheckBox, SearchBar, Image} from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { importedAlbums } from "../generatedFiles/Albums";
import { setNameOfAlbum, setNumSongs, setAlbumCover, setNameOfArtist, setAlbumTitles, setAlbumCovers} from "../../store/slices/albumSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { setChangeSongList, setCurrentSongList, SongList } from "../../store/slices/songListSlice";
import { useAudio } from "../context";

// Format of album
interface Album {
  title: string;
  cover: number;
  artist: string;
  songs: {
    title: string[];
    path: number[];
  };
}

const Search: React.FC = ({navigation}: any) => {

  const [searching, setSearching] = useState('');
  const [searchChoice, setSearchChoice] = useState(0);
  const [filter, setFilter] = useState(['']);
  const [uniqueArtists, setUniqueArtists] = useState(['']);
  const albumState = useSelector((state: RootState) => state.album);

  const {playSong} = useAudio();

  const dispatch = useDispatch<AppDispatch>();

  const updateSearch = (searcher: string) => {
    setSearching(searcher);

    // Combine all songs into a list, then find the song
    const more = importedAlbums.map(album => album.songs.title.flat(1));
    const singleList = more.flat(1);
    setFilter(singleList.filter((song) => song.toLowerCase().includes(searcher.toLowerCase())));
    console.log(filter);
    
  };

  useEffect(() => {
  // Logic to remove duplicate artists https://stackoverflow.com/questions/37217953/removing-duplicate-array-values-and-then-storing-them-react  
  const artists = importedAlbums.map((entry) => entry.artist);
  setUniqueArtists(Array.from(new Set(artists)));
  }, [])

  const changeSongColor = (name: string) => name === albumState.nameOfSong ? 'black' : 'white';
  
  const handleSongChange = (song: string, index: number) => {

    // Finds album cover using song title
    for (const cover of importedAlbums) {
      const songIndex = cover.songs.title.indexOf(song);
      if (songIndex !== -1) {
        console.log(cover);
        dispatch(setAlbumCover(cover.cover));
      }
    }
    dispatch(setCurrentSongList([song]))
    dispatch(setNumSongs(1));
    playSong(song, index);
  }

  // Fills in "identifying" info for album
  const goToAlbum = (album: Album ) => {
    dispatch(setNameOfAlbum(album.title))
    dispatch(setNumSongs(album.songs.title.length));
    dispatch(setAlbumCover(album.cover));
    dispatch(setNameOfArtist(album.artist));
  
    // Map song titles
    const songList: SongList[] = album.songs.title.map((title, index) => ({
      title,
      path: album.songs.path[index],
     }));
    dispatch(setChangeSongList(songList));
    navigation.navigate("AlbumContents");
  }

  // Fills in identifying info to display
  // on artist page
  const goToArtist = (artistName: string) => {

    let albumTitles = [];
    let albumCovers = [];
    let artistNameFound = '';
    let songs = [];

    for (const album of importedAlbums) {
      const songIndex = album.artist.indexOf(artistName);
      if (songIndex !== -1) {
      albumTitles.push(album.title);
      albumCovers.push(album.cover);
      artistNameFound = album.artist;
      songs = songs.concat(album.songs);
      }
    }

    dispatch(setAlbumTitles(albumTitles));
    dispatch(setAlbumCovers(albumCovers));
    dispatch(setNameOfArtist(artistName));
    dispatch(setChangeSongList(songs));

    navigation.navigate("InsideArtist");
  }

  const sort = () => {
    switch (searchChoice) {
      case 0: // Displays all
        return <FlatList 
          data={importedAlbums}
          renderItem = {({item, index}) => (
            <View key={index}>
              <Text h3> {item.artist}</Text>
              <Text h4> {item.title}</Text>
              {item.songs.title.map((song, index) => (
                <TouchableOpacity key={index} onPress={() => handleSongChange(song, index)}>
                  <Text style={{color:changeSongColor(song)}} >{song}</Text>
                </TouchableOpacity>
              ))}
            </View> 
          )}
          />;
      case 1: // Display only songs
      return <FlatList 
      data={filter}
      renderItem = {({item, index}) => (
        <View key={index}>
          <TouchableOpacity onPress={() => handleSongChange(item, index)}>
                  <Text style={{color:changeSongColor(item)}}>{item}</Text>
                </TouchableOpacity>
        </View> 
      )}
      />;
      case 2: // Display only aritsts (Probs later do smth wit tapping the artist)
        return <FlatList 
        data={uniqueArtists}
        renderItem = {({item, index}) => (
          <View key={index}>
            <TouchableOpacity onPress={() => goToArtist(item)}>
                <Text style={{color:changeSongColor(albumState.nameOfSong)}} h1>{item}</Text>
              </TouchableOpacity>
          </View> 
        )}
        />;
      case 3: // Display only albums (probs on tap bring person to album)
        return <FlatList 
        data={importedAlbums}
        renderItem = {({item, index}) => (
          <View key={index}>
                <TouchableOpacity onPress={() => goToAlbum(item)}>
                <Text style={{color: 'black'}} h1>{item.title}</Text>
                </TouchableOpacity>
          </View> 
        )}
        />;
      default:
        return <Text></Text>

    }
  }

  return (
      <LinearGradient
        colors ={['#800080', '#a60fa6', '#940694']} 
        locations={[0.3, 0.8, 0.99]} 
        style={styles.gradient}
      >
        <SafeAreaView style={{borderColor: 'transparent'}}>
        <SearchBar
      placeholder="Search"
      onChangeText={updateSearch}
      value={searching}
      containerStyle={{backgroundColor: 'transparent',}}
      style={{backgroundColor: 'transparent', borderColor: 'transparent'}}
      clearIcon
      round
      rightIcon={{name: 'book'}}
    />
    </SafeAreaView>
    <View style={{flexDirection: 'row'}}>
    {/* Checkbox for choices */}
  <CheckBox
    containerStyle={{backgroundColor: 'transparent'}}
    checked={searchChoice === 1}
    textStyle={{color: 'white'}}
    title = "Song"
    onPress={() => setSearchChoice(1)}
    checkedIcon="dot-circle-o"
    uncheckedIcon="circle-o"
  />
  <CheckBox
    containerStyle={{backgroundColor: 'transparent'}}
    checked={searchChoice === 2}
    textStyle={{color: 'white'}}
    title = "By artist"
    onPress={() => setSearchChoice(2)}
    checkedIcon="dot-circle-o"
    uncheckedIcon="circle-o"
  />
  <CheckBox
    containerStyle={{backgroundColor: 'transparent'}}
    checked={searchChoice === 3}
    textStyle={{color: 'white'}}
    title = "By album"
    onPress={() => setSearchChoice(3)}
    checkedIcon="dot-circle-o"
    uncheckedIcon="circle-o"
  />
  </View>
  <View style={{flexDirection: 'row-reverse'}}>
  <CheckBox
    containerStyle={{backgroundColor: 'transparent'}}
    checked={searchChoice === 0}
    textStyle={{color: 'white'}}
    title = "All"
    onPress={() => setSearchChoice(0)}
    checkedIcon="dot-circle-o"
    uncheckedIcon="circle-o"
  />
  </View>
    {sort()}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'black',
    width: 300,
    height: 400,
  },
  cardTitle: {
    fontSize: 40,
    color: 'white',
  }
});

export default Search;
