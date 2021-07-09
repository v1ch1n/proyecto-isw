const express = require("express");
const axios = require('axios');
const router = express.Router();

router.get("/", async (req, res) => {
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

module.exports = router;