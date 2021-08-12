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
        const id_maker = req.body.id_maker;
        const response = await axios.get("https://2c32fcf08ad9.up.railway.app/student/all");
        const data = response.data;
        var maker_exists = false;
        for (let i in data){
            if (data[i]['id'] === id_maker){
                maker_exists = true;
                break;
            }
        }
        if (maker_exists){
            const createProject = await Proyecto.create(req.body);
            res.send(createProject);
        }
        else{
            res.status(404).send({"message": "No existe un maker con tal ID"});
        }
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
        if (sesion.cumplida === false){
            sesion.cumplida = true;
            await sesion.save();
            res.status(200).json({message:"Sesión finalizada"});
        }
        else{
            res.status(400).send({message:"Sesión expirada"})
        }
    }
    catch(error){
        res.status(400).send(error);
    }
})

router.delete("/sessions/:id", async (req, res) =>{
    try{
        const id = req.params.id;
        Sesion.destroy({
            where:{
                id: id
            }
        })
        .then(function(deletedRecord){
            if(deletedRecord === 1){
                res.status(200).json({message:"Sesión eliminada satisfactoriamente"});          
            }
            else
            {
                res.status(404).json({message:"Sesión no existe"})
            }
        })
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
        const id_maquina = req.body.id_maquina;
        const response = await axios.get("http://ec2-3-131-75-133.us-east-2.compute.amazonaws.com/resources/listarMaquinas");
        const data = response.data;
        var machine_exists = false;
        for (let i in data){
            if (data[i][id_maquina]){
                machine_exists = true;
                break;
            }
        }
        if (sesion.cumplida === false){
            if (machine_exists){
                const createReservation = await Reserva.create(req.body);
                res.send(createReservation);
            }
            else{
                res.status(404).send({message: "No existe una máquina con tal ID"});
            }
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