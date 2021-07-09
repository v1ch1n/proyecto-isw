const express = require("express");
const axios = require('axios');
const router = express.Router();

router.get("/", async (req, res) => {
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

module.exports = router;