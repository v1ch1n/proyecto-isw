const express = require("express");
const axios = require('axios');
const router = express.Router();

router.get("/", async (req, res) =>{
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

module.exports = router;