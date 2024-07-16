// File to generate albums from assets, currently only works with bandcamp
// format

const fs = require('fs');
const path = require('path');

// Directory with songs
const pathToDir = path.join(__dirname, 'assets');



// Combines file names and song names
// NOTE: 
//      Because in windows it sorts files based in alphebetical order,
//      track list WILL be different from official track list unless 
//      there is something to differentiate the tracks. 
async function createAlbumList(directory) {
    try {

        // Variables for specific parts of directories/files
        const files = await fs.promises.readdir(directory);
        let albumNames = [];
        let listOfAlbums = [];
        
        for (const file of files) {
            const filePath = path.join(directory, file);
            const stats = await fs.promises.stat(filePath); // Creates path to file
            
            // If a folder is found, iterate through the songs and retrieve info like
            // artist name, song names, the file paths, album cover
            if (stats.isDirectory()) {
                albumNames.push(file);
                const singleAlbumName = file 
                const pathToInsideDir = path.join('assets', `${file}`);
                const insideDir = await fs.promises.readdir(pathToInsideDir);
                
                let songPaths = []; 
                let songNames = []; 
                let albumCover = ''; 
                let artistName = '';
                let songName = '';

                // Now inside folder, so get songs
                for (const fileInsideDir of insideDir) {

                    // In bandcamp format, first file is always the cover
                    if (fileInsideDir.toLowerCase().includes('cover')) {
                        albumCover = `require('./assets/${file}/${fileInsideDir}')`;
                    }
                    // After cover, get songs, split into the actual path and song name string 
                    else {
                        songPaths.push(`require('./assets/${file}/${fileInsideDir}')`);
                        songName = getSongName(fileInsideDir);
                        songNames.push(songName);
                        artistName = fileInsideDir.split('-');
                        
                    }
                }
                
                // Format album
                listOfAlbums.push({
                    title: singleAlbumName,
                    cover: albumCover,
                    artist: artistName[0],
                    songs: {
                        title: songNames,
                        path: songPaths,
                    }
                });
            }
        }

        // .replace(/"require\(.*?)\)"/g, 'require($1)'):
        //  finds every instance of "require" globally (/g), captures what is
        //  in the parantheses \((.*?)\), then replaces it with require method with
        //  what was captured being put inside of the parantheses ($1 holds the capture)
        //  https://regex101.com/r/iQ5gyQ/1
        //  https://stackoverflow.com/questions/13247864/javascript-replace-string-between-brackets-but-the-brackets-should-stay
        // https://stackoverflow.com/questions/75410617/how-to-load-local-audio-files-dynamically-with-expo-av
        const outputAlbumList = `export const importedAlbums = ${JSON.stringify(listOfAlbums, null, 1).replace(/"require\((.*?)\)"/g, 'require($1)')};`;
        
        // Output results
        fs.writeFile('Albums.js', outputAlbumList, error => {
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
function getSongName(file) {
    let songNameNoMP3 = file.replace('.mp3', ''); // Get rid of .mp3
    let components = songNameNoMP3.split(' - '); // Section out song title between the -
    let songNameWithNum = components[components.length - 1]; // Focus on the track number with song name part
    let songName = songNameWithNum.slice(songNameWithNum.indexOf(' ') + 1); // Slice from after space to end
    return songName; // Return just song name


}

createAlbumList(pathToDir);




