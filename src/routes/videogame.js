const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre, Videogame_Genre } = require("../db.js");
const router = Router();
const { API_KEY } = process.env;


router.get("/:idvideogame", async (req, res) => {
  const id = req.params.idvideogame;
  if (id.includes("-")) {
    try {
      const videogameById = await Videogame.findByPk(id, { include: Genre });
     
      res.send(videogameById);
    } catch (error) {
      res.send("The videogame does not exist");
    }
  } else {
    try {
        let dataApi = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    let detailsData = {
      name: dataApi.data.name,
      description: dataApi.data.description,
      released: dataApi.data.released,
      rating: dataApi.data.rating,
      genres: dataApi.data.genres.map((g) => g.name),
      platforms: dataApi.data.platforms.map((p) => p.platform.name),
      background_image: dataApi.data.background_image,
    };
    res.status(200).send(detailsData); 
    } catch (error) {
      res.send("The videogame does not exist");
    }
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      background_image,
      released,
      genres,
      rating,
      platforms,
      inDatabase,
    } = req.body;
    const newVideogame = await Videogame.create({
      name,
      background_image,
      description,
      released,
      rating,    
        platforms,
      inDatabase,
    });
    genres.forEach(async (genre) => {
      let g = await Genre.findOne({ where: { name: genre.name } });
      newVideogame.addGenre(g);
    });
    res.send("the videogame was saved successfully");
  } catch (error) {
    res.status(400).send("error:There is already a very similar videogame, check the entered values");
  }
});


module.exports = router;
