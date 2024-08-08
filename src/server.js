const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize");
const db = require("./models");

const app = express();

app.use(bodyParser.json());

db.sequelize.sync();

app.post("/api/bus-location", async (req, res) => {
  try {
    const { busNumber, latitude, longitude } = req.body;
    const newLocation = await db.BusLocation.create({
      busNumber,
      latitude,
      longitude,
      timestamp: new Date(),
    });
    res
      .status(201)
      .send({
        message: "Localização recebida com sucesso!",
        data: newLocation,
      });
  } catch (error) {
    res.status(500).send({ message: "Erro ao salvar a localização.", error });
  }
});

app.get("/api/bus-location", async (req, res) => {
  try {
    const locations = await db.BusLocation.findAll({
      order: [["timestamp", "DESC"]],
      limit: 10,
    });
    res.status(200).send(locations);
  } catch (error) {
    res.status(500).send({ message: "Erro ao obter localizações.", error });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
