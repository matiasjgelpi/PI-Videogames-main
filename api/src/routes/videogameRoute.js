const router = require("express").Router();

const { Videogame } = require("../db");

const getVideogameDetail = require("./utils/getVideogameDetail");

router.get("/:id", getVideogameDetail);

router.post("/", async (req, res) => {
  const { name, description, rating, released, img, genre, platform } =
    req.body;
  try {
    const newVideogame = await Videogame.create({
      name,
      description,
      rating,
      released,
      img,
    });

    await newVideogame.addGenres(genre);
    await newVideogame.addPlatforms(platform);

    res.status(201).send("game created");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
