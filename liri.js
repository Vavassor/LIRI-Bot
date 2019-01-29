const axios = require("axios");
const fs = require("fs");
const Spotify = require("node-spotify-api");
require("dotenv").config();
const keys = require("./keys.js");

function concertThis(args) {
  console.log("Not implemented yet!");
}

function doWhatItSays(args) {
  if (args.length > 1) {
    console.error("Too many arguments specified.");
    return;
  }
  
  fs.readFile("random.txt", "utf8", (error, data) => {
    if (error) {
      throw error;
    }

    const arguments = splitArguments(data);
    executeCommand(arguments);
  });
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
        doWhatItSays(args);
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
  if (args.length > 2) {
    console.error("Too many arguments specified.");
    return;
  }

  let movie;
  if (args.length < 2) {
    movie = "Mr. Nobody";
  } else {
    movie = args[1];
  }

  const url = "http://www.omdbapi.com/?apikey=trilogy&t=" + encodeURIComponent(movie);
  axios.get(url).then((response) => {
    const data = response.data;
    const rottenTomatoesRating = data.Ratings.find(element => element.Source === "Rotten Tomatoes");

    outputResult("Title: " + data.Title + "\n"
        + "Released: " + data.Released + "\n"
        + "IMDB Rating: " + data.imdbRating + "\n"
        + "Rotten Tomatoes Rating: " + rottenTomatoesRating.Value + "\n"
        + "Country: " + data.Country + "\n"
        + "Language: " + data.Language + "\n"
        + "Plot: " + data.Plot + "\n"
        + "Actors: " + data.Actors);
  });
}

function outputResult(result) {
  console.log(result);
}

function splitArguments(string) {
  const index = string.indexOf(",");
  if (index !== -1) {
    return [string.slice(0, index), string.slice(index + 1)];
  } else {
    return [string];
  }
}

function spotifyThisSong(args) {
  if (args.length > 2) {
    console.error("Too many arguments specified.");
    return;
  }

  let songName;
  if (args.length < 2) {
    songName = "The Sign";
  } else {
    songName = args[1];
  }
  
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
