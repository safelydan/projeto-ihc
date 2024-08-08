const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, where } = require("sequelize");
const db = require("./models");
const routes = require("./routes");
const app = express();

app.use(bodyParser.json());

db.sequelize.sync();

app.use("/api", routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
