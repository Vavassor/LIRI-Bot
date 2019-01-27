const Spotify = require("node-spotify-api");
require("dotenv").config();
const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);

spotify.search({
  type: "track",
  query: "I Want it That Way",
}).then((response) => {
  const firstResult = response.tracks.items[0];
  const artistNames = firstResult.artists.map(artist => artist.name);

  console.log(
      "Track Name: " + firstResult.name + "\n"
      + "Artists: " + artistNames.join(", ") + "\n"
      + "Album: " + firstResult.album.name + "\n"
      + "Preview URL: " + firstResult.preview_url);
});