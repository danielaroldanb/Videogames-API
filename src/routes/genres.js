const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre, Videogame_Genre } = require("../db.js");
const router = Router();
const { API_KEY } = process.env;

router.get("/", async (req, res) => {
  try {
    let GenresByApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    let dataGenres = GenresByApi.data.results.map(async (g) => {
      await Genre.findOrCreate({ where: { name: g.name } });
    });
    const AllGenres = await Genre.findAll();
        res.status(200).send(AllGenres);
  } catch (error) {
    res.status(404).send({ error: "Genre not found" });
  }
});

module.exports = router;
