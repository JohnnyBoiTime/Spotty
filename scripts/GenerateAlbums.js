const fs = require('fs');
const path = require('path');

// Goes into assets file in app and generates the album list. 

// DOES NOT WORK WITH ALBUM/SONG NAMES WITH APOSTROPHES! Works best with
// bandcamp format

// Directory with songs
const pathToDir = path.join(__dirname, '..', 'app', 'assets', 'Albums'); // Creates path to albums from here

// Combines file names and song names
// NOTE: 
//      Because in windows it sorts files based in alphebetical order,
//      track list WILL be different from official track list unless 
//      there is something to differentiate the tracks. 
async function createAlbumList(directory) {
    try {

        // Variables for specific parts of directories/files
        const assets = await fs.promises.readdir(directory);
        let albumNames = [];
        let listOfAlbums = [];

        try {

        for (const albumFolder of assets) {
            const filePath = path.join(directory, albumFolder);
            const stats = await fs.promises.stat(filePath); // Creates path to file

            // If a folder is found, iterate through the songs and retrieve info like
            // artist name, song names, the file paths, album cover
            if (stats.isDirectory()) {
                albumNames.push(albumFolder);
                const singleAlbumName = albumFolder;
                const pathToAlbum = path.join('..', 'app', 'assets', 'Albums', `${albumFolder}`);
                const insideAlbum = await fs.promises.readdir(pathToAlbum);

                let songPaths = [];
                let songNames = [];
                let albumCover = '';
                let artistName = '';
                let songName = '';

                // Now inside folder, so get songs
                for (const song of insideAlbum) {

                    // In bandcamp format, first file is always the cover
                    if (song.toLowerCase().includes('cover')) {
                        albumCover = `require('../assets/Albums/${albumFolder}/${song}')`;
                    }
                    // After cover, get songs, split into the actual path and song name string 
                    else {
                        songPaths.push(`require('../assets/Albums/${albumFolder}/${song}')`);
                        songName = getSongName(song);
                        songNames.push(songName);
                        artistName = song.split('-')[0];
                    }
                }

                // Format album
                listOfAlbums.push({
                    title: singleAlbumName,
                    cover: albumCover,
                    artist: artistName,
                    songs: {
                        title: songNames,
                        path: songPaths,
                    }
                });
            }
        }
    } catch(error) {
        console.log(error);
    }

         // .replace(/"require\(.*?)\)"/g, 'require($1)'):
        //  finds every instance of "require" globally (/g), captures what is
        //  in the parantheses \((.*?)\), then replaces it with require method with
        //  what was captured being put inside of the parantheses ($1 holds the capture)
        //  https://regex101.com/r/iQ5gyQ/1
        //  https://stackoverflow.com/questions/13247864/javascript-replace-string-between-brackets-but-the-brackets-should-stay
    const outputAlbumList = `export const importedAlbums = ${JSON.stringify(listOfAlbums, null, 1).replace(/"require\((.*?)\)"/g, 'require($1)')}`;

    // Direct output to generatedFiles in app
    const pathToOutDir = path.join(__dirname, '..', 'app', 'generatedFiles');
    const outputAlbumListDestination = path.join(pathToOutDir, 'Albums.ts');

    // Output results
    fs.writeFile(outputAlbumListDestination, outputAlbumList, error => {
        if (error) {
            console.log(`Could not import albums: ${error}`);
        }
        console.log("Successfully wrote to file!");
    });

    } catch (error) {
        throw new Error(`Could not read directory: ${error}`);
    }
};

// Extract just the song name 
function getSongName(song) {
    let songNameNoMP3 = song.replace('.mp3', ''); // Get rid of .mp3
    let components = songNameNoMP3.split(' - '); // Section out song title between the -
    let songNameWithNum = components[components.length - 1]; // Focus on the track number with song name part
    let songName = songNameWithNum.slice(songNameWithNum.indexOf(' ') + 1); // Slice from after space to end
    return songName; // Return just song name
};

createAlbumList(pathToDir);
