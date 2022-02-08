const { Router } = require("express");
const videogameRoute=require("./videogames")
const genreRoute=require("./genres")
const videogameId=require("./videogame")
const platformRoute=require("./platforms")
const router = Router();


router.use("/videogames",videogameRoute)
router.use("/videogame",videogameId)
router.use("/genres",genreRoute)
router.use("/platforms",platformRoute)





module.exports = router;
