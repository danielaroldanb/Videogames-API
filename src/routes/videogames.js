const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre, Videogame_Genre } = require("../db.js");
const { Op } = require("sequelize");
const e = require("express");
const router = Router();
const { API_KEY } = process.env;

const getdataApi = async () => {
  let videogames = [];
  let URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
  try {
    for (let i = 0; i <1; i++) {
      let dataApi = await axios.get(URL);
      let HomeData = await dataApi.data.results.map((propApi) => {
        return {
          id: propApi.id,
          name: propApi.name,
          background_image: propApi.background_image,
          rating: propApi.rating,
          genres: propApi.genres.map((genre) => genre.name ),
          platforms:propApi.platforms.map(p=>p.platform.name)
        };
      });
      videogames = videogames.concat(HomeData);
      URL = dataApi.data.next;
    }
    return videogames;
  } catch (error) {
    return "Videogame not found";
  }
};

const getdataDB = async () => {
  try {
    let dataDB = await Videogame.findAll({ include: { model: Genre } });
    const ordered=dataDB.map((e)=>{
      return {
        id:e.id,
        name:e.name,
        rating:e.rating,
        background_image:e.background_image,
        genres:e.genres.map((e)=>e.name),
        inDatabase:e.inDatabase,
        platforms:e.platforms.map(p=>p.platform.name)
      }
    })
    return ordered

  } catch (error) {
    return "Videogame not found";
  }
};

const getAllData = async () => {
  let ApiInfo = await getdataApi();
  let DBInfo = await getdataDB();
  let AllInfo = ApiInfo.concat(DBInfo);
  return AllInfo;
};

const getdataApiByQuery = async (name) => {
  try {
    let dataApi = await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
    );
    let HomeData = await dataApi.data.results.map((propApi) => {
      return {
        id: propApi.id,
        name: propApi.name,
        background_image: propApi.background_image,
        rating: propApi.rating,
        genres: propApi.genres.map((genre) => genre.name),
        platforms:propApi.platforms.map(p=>p.platform.name)
      };
    });
    return HomeData;
  } catch (error) {
    return "Videogame not found";
  }
};

const getdataDBByQuery = async (name) => {
  try {
    let dataDB = await Videogame.findAll({
      where: {
        name: { [Op.iLike]: "%" + name + "%" },
      },
      include: Genre,
    });
    let ordered=dataDB.map(v=>{
      return{
        
        name:v.name,
        id:v.id,
        rating:v.rating,
        background_image:v.background_image,
        genres:v.genres.map(g=>g.name),
        inDatabase:v.inDatabase,
        platforms:v.platforms.map(p=>p.platform.name)
      }
    })
    return ordered;
  } catch (error) {
  return "Videogame not found" ;
  }
};

const getAllDataByQuery = async (name) => {
  let ApiInfo = await getdataApiByQuery(name);
  let DBInfo = await getdataDBByQuery(name);
  let AllInfo = ApiInfo.concat(DBInfo);
  return AllInfo;
};

router.get("/", async (req, res) => {
  const { name } = req.query;
  let AllVideogames = await getAllData();

  if (name) {
    let videojuegoByQuery = await getAllDataByQuery(name);

    videojuegoByQuery.length
      ? res.status(200).send(videojuegoByQuery.slice(0,15))
      : res.status(404).send("Videogame not found");
  } else {
    res.send(AllVideogames);
  }
});



module.exports = router;
