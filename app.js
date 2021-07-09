const express = require('express');
const app = express();

const axios = require('axios');

app.use(express.json());
app.use("/user-emails", require("./routes/userEmails"));
app.use("/prints-status", require("./routes/printsStatus"));
app.use("/prints-by-year", require("./routes/printYear"));
app.use("/user-prints", require("./routes/userPrints"))

//servidor
app.listen(8080, () => {console.log("El servidor está funcionando")});