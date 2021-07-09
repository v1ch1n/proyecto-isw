const express = require("express");
const axios = require('axios');
const router = express.Router();

router.get("/", async (req, res) => {
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

module.exports = router;