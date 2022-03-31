const { Videogame, Genre, Platform } = require("../db");

const { Router } = require("express");
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genresRoute = require("./genresRoute");
const platformsRoute = require("./platformsRoute");
const videogamesRoute = require("./videogamesRoute");
const videogameRoute = require("./videogameRoute");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogamesRoute);
router.use("/genres", genresRoute);
router.use("/platforms", platformsRoute);
router.use("/videogame", videogameRoute);

module.exports = router;
