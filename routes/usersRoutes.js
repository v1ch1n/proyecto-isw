const express = require("express");
const axios = require('axios');
const router = express.Router();

// Obtenemos los emails registrados en la plataforma
router.get("/emails", async (req, res) => {
    try{
        const response = await axios.get("https://c840cfx2we.execute-api.us-east-1.amazonaws.com/dev/isw/org-user-list-report");
        const data = response.data;
        const emails = new Set();
        var number_accounts = 0;
        data.Items.forEach(element => {
            var email = element.account;
            emails.add(email);
            number_accounts += 1;
        });
        return res.send({emails: Array.from(emails), number_accounts});
    } catch(error){
        res.status(400).send(error);
    }
})

// Obtenemos las impresiones realizadas por un usuario en concreto
router.get("/prints-by", async (req, res) => {
    try{
        const response = await axios.get("https://c840cfx2we.execute-api.us-east-1.amazonaws.com/dev/isw/user-report");
        const data = response.data;
        var user = req.query.user;
        var prints = 0;
        var print_errors = 0;
        var last_print_date = 0;
        var material_used_kg = 0;
        data.Items.forEach(element => {
            if (element.account == user){
                prints = element.prints;
                print_errors = element.print_errors;
                last_print_date = element.last_print_date_time;
                material_used_kg = element.material_used_kg;
            }
        });
        return res.send({prints, print_errors, last_print_date, material_used_kg});
    } catch(error){
        res.status(400).send(error);
    }
})

// Obtenemos todas las impresiones realizadas, divididas en finalizadas, abortadas y fallidas
router.get("/prints-status", async (req, res) =>{
    try{
        const response = await axios.get("https://c840cfx2we.execute-api.us-east-1.amazonaws.com/dev/isw/audit-report");
        const data = response.data;
        var finished = 0;
        var aborted = 0;
        var failed = 0;
        var total_uses = 0;
        data.Items.forEach(element => {
            if (element.status === 'Finished'){
                finished += 1;
            }
            else if (element.status === 'Aborted'){
                aborted += 1;
            }
            else{
                failed += 1;
            }
        });
        total_uses = finished + aborted + failed;
        return res.send({finished, aborted, failed, total_uses});
    } catch(error){
        res.status(400).send(error);
    }
})

// Obtenemos los usuarios que han realizado impresiones en un año en concreto
router.get("/prints-by-year", async (req, res) => {
    try{
        const response = await axios.get("https://c840cfx2we.execute-api.us-east-1.amazonaws.com/dev/isw/audit-report");
        const data = response.data;
        var year = req.query.year;
        const users = new Set();
        data.Items.forEach(element => {
            var date = element.date.slice(0,4);
            if (year === date){
                if (element.email.slice(0,7) !== 'deleted'){
                    users.add(element.email);
                }
            }
        });
        return res.send({users: Array.from(users)});
    } catch(error){
        res.status(400).send(error);
    }
})

// Obtenemos todos los usuarios pertenecientes a un grupo de trabajo
router.get("/workgroup", async (req, res) => {
    try{
        const response = await axios.get("https://c840cfx2we.execute-api.us-east-1.amazonaws.com/dev/isw/org-user-list-report");
        const data = response.data;
        var group = req.query.group;
        const users = new Set();
        data.Items.forEach(element => {
            if (element.workgroup_name === group){
                users.add(element.account);
            }
        });
        return res.send({users: Array.from(users)});
    } catch(error){
        res.status(400).send(error);
    }
})

module.exports = router;