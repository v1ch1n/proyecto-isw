const express = require("express");
const axios = require('axios');
const router = express.Router();

router.get("/", async (req, res) => {
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