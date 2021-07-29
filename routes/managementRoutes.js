const express = require("express");
const axios = require('axios');
const router = express.Router();

// Modelos
const { Proyecto, Sesion, Reserva } = require("../models");

// Proyectos
router.get("/projects", async (req, res) => {
    try{
        const projects = await Proyecto.findAll();
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
                res.status(200).json({message:"Proyecto eliminado satisfactoriamente"});          
            }
            else
            {
                res.status(404).json({message:"Proyecto no existe"})
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

// Reservas
router.get("/reservations", async (req, res) =>{
    try{
        const reservations = await Reserva.findAll();
        res.send(reservations);
    }
    catch(error){
        res.status(400).send(error);
    }
})

router.post("/reservations", async (req, res) =>{
    try{
        const id_sesion = req.body.id_sesion;
        const sesion = await Sesion.findByPk(id_sesion);
        if (sesion.cumplida === false){
            const createReservation = await Reserva.create(req.body);
            res.send(createReservation);
        }
        else{
            res.status(401).send({message: "Necesitas tener una sesión activa para reservar una máquina"});
        }
    }
    catch(error){
        res.status(400).send(error);
    }
})

router.put("/reservations/:id", async (req, res) =>{
    try{
        const id = req.params.id;
        const timestamp = req.body.timestamp;
        const timestampTime = new Date(timestamp).getTime();
        const currentTime = new Date().getTime();
        if (timestampTime > currentTime){
            const reservation = await Reserva.findByPk(id);
            reservation.timestamp = timestamp;
            await reservation.save();
            res.send({message: "Hora de la reserva actualizada"});
        }
        else{
            res.status(400).send({message: "Hora no válida para reserva"});
        }
    }
    catch(error){
        res.status(400).send(error);
    }
})

router.delete("/reservations/:id", async (req, res) =>{
    try{
        const id = req.params.id;
        Reserva.destroy({
            where:{
                id: id
            }
        })
        .then(function(deletedRecord){
            if(deletedRecord === 1){
                res.status(200).json({message:"Reserva eliminada satisfactoriamente"});          
            }
            else
            {
                res.status(404).json({message:"Reserva no existe"})
            }
        })
    }
    catch(error){
        res.status(400).send(error);
    }
})

module.exports = router;