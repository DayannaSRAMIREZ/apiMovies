const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const {checkID} =require('../../helpers/index')
const moment = require('moment');
const { includes } = require('lodash');
const { response } = require('express');

const moviesController = {
    list: async(req, res) => {
        let response; 
        try {
            let movies = await db.Movie.findAll({
                 include: ['genre']
            }); 
            response={
                ok:true, 
                meta: {
                    status: 200, 
                    total: movies.length
                },
                data: movies
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
    detail: async(req, res) => {
      if(checkID(req.params.id)){
          return res.status(404).json(checkID(req.params.id))
      }
      let response; 
      try {
        let movie = await db.Movie.findByPk(req.params.id); 
        if(!movie){
            response ={
                ok: false,
                meta: {
                    status: 404
                },
                msg: "No se encuentra la pelicula con ese id"
            }
            return res.status(400).json(response)
        }
        response ={
            ok : true, 
            meta: {
                status: 200
            },
            data: movie
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
    
    recomended: async(req, res) => {
        let response; 
        try {
       
            let movies = await db.Movie.findAll({
                 include: ["genre"], 
                 where: {
                     rating: {[Op.gte]: +req.query.rating || 8}
                 },
                 order: [["rating", "DESC"]]
            })
            response ={
                ok : true, 
                meta: {
                    status: 200,
                    total: movies.length
                },
                data: movies
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
    nuevo: async(req,res)=>{
        let response; 
        try {
            let movies = await db.Movie.findAll({
            order: [["release_date", "DESC"]],
            limit: +req.query.limit || 5
            })
        response ={
                ok : true, 
                meta: {
                    status: 200
                },
                data: movies
            }
            return res.status(200).json(response)
        } catch (error) {
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

    create: (req,res) =>{
        Movies
        .create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
        .then(()=> {
            return res.redirect('/movies')})            
        .catch(error => res.send(error))
    },
   
    update: function (req,res) {
        let movieId = req.params.id;
        Movies
        .update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
            })
        .then(()=> {
            return res.redirect('/movies')})            
        .catch(error => res.send(error))
    },
    
    destroy: function (req,res) {
       
    }
}

module.exports = moviesController;