A music storage system where you can store and play music. Still being worked on.

REWRITING IN TYPESCRIPT AS OF 7/18/2024

HOW TO USE (SO FAR):

Put albums in folders, must be in bandcamp format.

node GenerateAlbum.js generates album from directories in assets, so make sure album is in a file that is the name of the album.


TO DO LIST (For front-end):

~~-Make it so selected songs chage color~~ (Done 7/17/2024)
    - Make it more specific to avoid same song name conflicts, and also maybe add a button next to the song playing

-Make it so user can make playlists

-Make it so user can search for songs that are downloaded

-Make log in screen work, as well as create account and forgot password

~~Improve song loading and playing times, maybe pre-load the music?~~ (Done 7/15/2024, pre-downloads music) 
    -IMPROVE LOADING TIMES SOMEHOW (CHUNKS? PARALLEL?)

-Add progress bar/number on screen for downloaded music / music that still needs to be downloaded so user can see progress

-Potentially implement caching for the songs to improve performance

-Improve phone experience (when using phone device and not emulator)

-Add shuffling music

-Other stuff
