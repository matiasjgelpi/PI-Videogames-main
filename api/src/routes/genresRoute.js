const axios = require("axios");
const router = require("express").Router();
const { Genre } = require("../db");
const { API_KEY, BASE_URL } = process.env;
const apiURL = `${BASE_URL}genres?key=${API_KEY}`;

router.get("/", async (req, res) => {
  try {
    let dataBaseGenres = await Genre.findAll();
    if (dataBaseGenres.length !== 0) {
      return res.json(dataBaseGenres);
    } else {
      let response = await axios(apiURL);

      const genres = response.data.results.map((genre) => {
        return { id: genre.id, name: genre.name };
      });

      genres.forEach((genre) => {
        Genre.create({
          id: genre.id,
          name: genre.name,
        });
      });

      res.json(genres);
    }
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
