const { Videogame, Platform, Genre } = require("../../db");
const axios = require("axios");
const { Op } = require("sequelize");

async function getVideogamesBySearch(url, query) {
  let games = [];
  let response = await axios(url);

  if (response.data.count === 0) {
    return "game not found";
  } else {
    games = response.data.results.map((game) => {
      return {
        id: game.id,
        name: game.name,
        img: game.background_image,
        genres: game.genres,
        rating: game.rating,
        api: true,
      };
    });

    const gamesdb = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
      include: [
        {
          model: Platform,
        },
        { model: Genre },
      ],
    });

    if (games && gamesdb) {
      return gamesdb.concat(games);
    } else if (!games) {
      return gamesdb;
    } else if (!gamesdb) {
      return games;
    } else {
      ("game not found");
    }
  }
}

module.exports = getVideogamesBySearch;
