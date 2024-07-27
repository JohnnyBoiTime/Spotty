A music storage system where you can store and play music. Still being worked on. Original name was spotty, but changed to Jammi

Originally in javascript, started re-writing into typescript in 7/18/2024 and

Finished in 7/26/2024

Features:
- Make playlists
- Store songs locally on device
- Music player that is present around the app allows user to skip, go to previous, pause, play, and seek through currently playing songs.
- Generate albums simply by placing an album folder with songs into assets and running node GenerateAlbums.js
- Search through songs

Uses:
- React Redux and useContext, although redux is more heavily used
- React native elements for UI
- Various expo libraries for audio and sending files ot device
- AsyncStorage
- React navigation

Notes:
- When music is playing and music player is active, app becomes really slow, probably implement react-native-track-player
