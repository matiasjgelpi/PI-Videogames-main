const axios = require("axios");
const router = require("express").Router();

const { API_KEY, BASE_URL } = process.env;
const apiURL = `${BASE_URL}games?key=${API_KEY}`;

const getAllVideogames = require("./utils/getAllVideogames");
const getVideogamesBySearch = require("./utils/getVideogamesBySearch");

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      let response = await getVideogamesBySearch(
        `${apiURL}&search=${name}`,
        `${name}`
      );
      if (typeof response === "string") {
        res.send([response]);
      } else {
        res.send(response);
      }
    } else {
      //Revisar antes de entregar el tema del fetch
      res.send(await getAllVideogames(apiURL));
    }
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
