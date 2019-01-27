const Spotify = require("node-spotify-api");
require("dotenv").config();
const keys = require("./keys.js");

function outputResult(result) {
  console.log(result);
}

function concertThis(args) {
  console.log("Not implemented yet!");
}

function doWhatItSays() {
  console.log("Not implemented yet!");
}

function executeCommand(args) {
  if(args.length < 1) {
    console.error("Please enter a command.");
  } else {
    switch (args[0]) {
      case "concert-this":
        concertThis(args);
        break;

      case "do-what-it-says":
        doWhatItSays();
        break;

      case "movie-this":
        movieThis(args);
        break;

      case "spotify-this-song":
        spotifyThisSong(args);
        break;
    }
  }
}

function movieThis(args) {
  console.log("Not implemented yet!");
}

function spotifyThisSong(args) {
  if (args.length !== 2) {
    console.error("Please enter one song to search for on spotify.");
    return;
  }

  const songName = args[1];
  const spotify = new Spotify(keys.spotify);

  spotify.search({
    type: "track",
    query: songName,
  }).then((response) => {
    const firstResult = response.tracks.items[0];
    const artistNames = firstResult.artists.map(artist => artist.name);
  
    outputResult("Track Name: " + firstResult.name + "\n"
        + "Artists: " + artistNames.join(", ") + "\n"
        + "Album: " + firstResult.album.name + "\n"
        + "Preview URL: " + firstResult.preview_url);
  });
}

const nodeArgs = process.argv.slice(2);
executeCommand(nodeArgs);
