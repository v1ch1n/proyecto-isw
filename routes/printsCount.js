const express = require("express");
const axios = require('axios');
const router = express.Router();

router.get("/", async (req, res) =>{
    try {
        const response = await axios.get('https://c840cfx2we.execute-api.us-east-1.amazonaws.com/dev/isw/user-report');
        const data = response.data;
        var prints = 0
        data.Items.forEach(element => {
            var print = element.prints;
            prints += print;
        });
        return res.send({prints});
    } catch(error){
        res.status(400).send(error);
    }
})

module.exports = router;