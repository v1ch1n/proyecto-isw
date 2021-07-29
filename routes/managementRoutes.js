const express = require("express");
const axios = require('axios');
const router = express.Router();

// Modelos
const { Proyecto } = require("../models");
const { Sesion } = require("../models");
const { Reserva } = require("../models");

// Proyectos
router.get("/projects", async (req, res) => {
    try{
        const projects = await Proyecto.findAll({
            attributes: ["id", "id_maker", "nombre", "descripcion"],
        });
        res.send(projects);
    }
    catch(error){
        res.status(400).send(error);
    } 
})

router.post("/projects", async (req, res) => {
    try{
        const createProject = await Proyecto.create(req.body);
        res.send(createProject);
    }
    catch(error){
        res.status(400).send(error);
    }
})

router.delete("/projects/:id", async (req, res) => {
    try{
        const id = req.params.id;
        Proyecto.destroy({
            where:{
                id: id
            }
        })
        .then(function (deletedRecord) {
            if(deletedRecord === 1){
                res.status(200).json({message:"Deleted successfully"});          
            }
            else
            {
                res.status(404).json({message:"record not found"})
            }
        })
    }
    catch(error){
        res.status(404).send(error);
    }
})

// Sesiones
router.get("/sessions", async (req, res) => {
    try{
        const sesion = await Sesion.findAll();
        res.send(sesion);
    }
    catch(error){
        res.status(400).send(error);
    } 
})

router.post("/sessions", async (req, res) =>{
    try{
        const createSession = await Sesion.create(req.body);
        res.send(createSession);
    }
    catch(error){
        res.status(400).send(error);
    }
})

router.put("/sessions/:id", async (req, res) =>{
    try{
        const id = req.params.id;
        const sesion = await Sesion.findByPk(id);
        sesion.cumplida = true;
        await sesion.save();
        res.status(200).json({message:"Sesión finalizada"});
    }
    catch(error){
        res.status(400).send(error);
    }
})

module.exports = router;