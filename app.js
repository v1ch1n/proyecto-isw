const express = require('express');
const app = express();

const axios = require('axios');

app.use(express.json());
app.use("/users", require("./routes/usersRoutes"));
app.use("/management", require("./routes/managementRoutes"));

//servidor
app.listen(8080, () => {console.log("El servidor está funcionando")});