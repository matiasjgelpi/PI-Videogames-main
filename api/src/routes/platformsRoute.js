const axios = require("axios");
const router = require("express").Router();
const { Platform } = require("../db");
const { API_KEY, BASE_URL } = process.env;
const apiURL = `${BASE_URL}platforms?key=${API_KEY}`;

router.get("/", async (req, res) => {
  try {
    let dataBasePlatforms = await Platform.findAll();
    if (dataBasePlatforms.length !== 0) {
      return res.json(dataBasePlatforms);
    } else {
      let platforms = [];
      let response = await axios(apiURL);
      platforms = [...platforms, ...response.data.results];
      let nextUrl = response.data.next;

      while (nextUrl) {
        response = await axios(nextUrl);
        platforms = [...platforms, ...response.data.results];
        nextUrl = response.data.next;
      }

      (platforms = platforms.map((platform) => {
        Platform.create({
          id: platform.id,
          name: platform.name,
        });

        return { id: platform.id, name: platform.name };
      })),
        res.json(platforms);
    }
  } catch (error) {
    console.error(error.message);
  }
});

module.exports = router;
