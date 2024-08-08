const express = require("express");
const bodyParser = require("body-parser");
const { Sequelize, where } = require("sequelize");
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
    res.status(201).send({
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

app.get("/api/bus-location/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const locations = await db.BusLocation.findOne({
      where: {
        id: id,
      },
      order: [["timestamp", "DESC"]],
      limit: 10,
    });
    res.status(200).send(locations);
  } catch (error) {
    res.status(500).send({ message: "Erro ao obter localizações.", error });
  }
});

app.put("/api/bus-location/:id", async (req, res) => {
  const { id } = req.params;
  const { busNumber, latitude, longitude } = req.body;
  try {
    const locationUpdated = await db.BusLocation.findOne({
      where: {
        id: id,
      },
    });

    if (!locationUpdated) {
      return res.status(401).send({ message: "Localização não encontrada" });
    }

    const atualizacao = await locationUpdated.update({
      busNumber,
      latitude,
      longitude,
      timestamp: new Date(),
    });

    res.status(200).send({message: 'Localização atualizada com sucesso', data: atualizacao})

  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a localização." });
  }
});

app.delete("/api/bus-location/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const locationToDelete = await db.BusLocation.findOne({
      where: {
        id: id,
      },
    });
    
    if (!locationToDelete) {
      return res.status(401).send({ message: "Localização não encontrada" });
    }

    await locationToDelete.destroy()

    res.status(200).send({message: 'Localização deletada com sucesso'})

  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar a localização." });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
