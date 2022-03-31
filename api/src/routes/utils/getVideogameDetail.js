const axios = require("axios");
const { API_KEY, BASE_URL } = process.env;
const { Videogame, Platform, Genre } = require("../../db");
async function getVideogameDetail(req, res) {
  try {
    if (req.params.id.length < 36) {
      let response = await axios(
        `${BASE_URL}games/${req.params.id}?key=${API_KEY}`
      );

      const {
        id,
        name,
        background_image: img,
        genres,
        description,
        released,
        rating,
        platforms,
      } = response.data;

      const game = {
        id,
        name,
        img,
        genres,
        description,
        released,
        rating,
        platforms,
      };
      res.send(game);
    } else {
      let response = await Videogame.findOne({
        where: { id: req.params.id },

        include: [
          {
            model: Platform,
          },
          { model: Genre },
        ],
      });

      res.json(response);
    }
  } catch (error) {
    console.error(error.message);
    res.status(404).send("Game not found");
  }
}

module.exports = getVideogameDetail;
