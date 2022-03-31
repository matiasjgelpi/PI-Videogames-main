const fetch = require("node-fetch");
const { Videogame, Platform, Genre } = require("../../db");

async function getAllVideogames(url) {
  let games = [];
  let response = await fetch(url).then((data) => data.json());
  games = [...games, ...response.results];
  let nextUrl = response.next;
  let page = 1;

  while (page < 5) {
    response = await fetch(nextUrl).then((data) => data.json());
    games = [...games, ...response.results];
    nextUrl = response.next;
    page++;
  }

  let gamedb = await Videogame.findAll({
    include: [
      {
        model: Platform,
      },
      { model: Genre },
    ],
  });

  games = games.map((game) => {
    return {
      id: game.id,
      name: game.name,
      img: game.background_image,
      genres: game.genres.map((g) => g.name),
      rating: game.rating,
      platforms: game.platforms.map((e) => e.platform.name),
      api: true,
    };
  });

  return gamedb.concat(games);
}

module.exports = getAllVideogames;
