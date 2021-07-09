const express = require('express');
const app = express();

const axios = require('axios');

app.get("/", async (req, res) =>{
    try {
        const response = await axios.get('https://c840cfx2we.execute-api.us-east-1.amazonaws.com/dev/isw/audit-report');
        const data = response.data;
        console.log(data);
        return res.send(data);
    } catch(error){
        res.status(400).send(error);
    }
});

//servidor
app.listen(8080, () => {console.log("El servidor está funcionando")});