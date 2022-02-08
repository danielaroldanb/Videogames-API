const { Router } = require("express");
const axios = require("axios");
const {Platform,Videogame, Genre, Videogame_Genre  } = require("../db.js");
const router = Router();
const { API_KEY } = process.env;

router.get("/", async (req, res) => {
    try {
      let platformsByApi = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`);
      let dataPlatforms = platformsByApi.data.results.map(async (p) => {
        await Platform.findOrCreate({ where: {name: p.name} });
      });
      const AllPlatforms = await Platform.findAll();
          res.status(200).send(AllPlatforms);
           } catch (error) {
      res.status(404).send({ error: "Platform not found" });
    }
  });

module.exports = router;
