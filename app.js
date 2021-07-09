const express = require('express');
const app = express();

const axios = require('axios');

app.use(express.json());
app.use("/prints-count", require("./routes/printsCount"));

//servidor
app.listen(8080, () => {console.log("El servidor está funcionando")});