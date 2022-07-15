const { Op } = require('sequelize');
const db = require('../../database/models');
const sequelize = db.sequelize;
const {checkID} =require('../../helpers/index')

const genresController = {
  'list': async (req, res) => {
    try {
      let genres = await db.Genre.findAll();
      let response = {
        ok: true,
        meta: {
          status: 200,
          total: genres.length
        },
        data: genres
      }
      return res.status(200).json(response)
    } catch (error) {
      console.log(error);
      let response = {
        ok: false,
        meta: {
          status: 500
        },
        msg: error.message ? error.message : "comuniquese con el administrador del sitio"
      }
      return res.status(500).json(response)
    }


  },
  'detail': async (req, res) => {
    let response;
    if(checkID(req.params.id)){
        return res.status(404).json(checkID(req.params.id))
    }
    try {
      let genre = await db.Genre.findByPk(req.params.id);
      response = {
        ok: true,
        meta: {
          status: 200,
        },
        data: genre
      }
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      let response = {
        ok: false,
        meta: {
          status: 500
        },
        msg: error.message ? error.message : "comuniquese con el administrador del sitio"
      }
      return res.status(500).json(response)
    }
  },
  name: async (req, res) => {
    try {
      let genre = await db.Genre.findOne({
        where: {
          name: {[Op.substring]:req.params.name }
        }
      });

      let response;
      if (genre) {
        response = {
          ok: true,
          meta: {
            status: 200,
          },
          data: genre
        }

      } else {
        response = {
          ok: false,
          meta: {
            status: 200,
          },
          msg: `No existe un genero con el nombre ${req.params.name}`
        }
      }
      return res.status(404).json(response)
    } catch (error) {
      console.log(error);
      let response = {
        ok: false,
        meta: {
          status: 500
        },
        msg: error.message ? error.message : "comuniquese con el administrador del sitio"
      }
      return res.status(500).json(response)
    }
  }

}


module.exports = genresController;