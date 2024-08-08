const express = require("express");
const router = express.Router();
const db = require("./models");

// Rota para criar uma nova localização
router.post("/bus-location", async (req, res) => {
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

// Rota para obter todas as localizações
router.get("/bus-location", async (req, res) => {
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

// Rota para obter uma localização por ID
router.get("/bus-location/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const location = await db.BusLocation.findOne({
      where: { id: id },
    });
    if (!location) {
      return res.status(404).send({ message: "Localização não encontrada." });
    }
    res.status(200).send(location);
  } catch (error) {
    res.status(500).send({ message: "Erro ao obter localização.", error });
  }
});

// Rota para atualizar uma localização por ID
router.put("/bus-location/:id", async (req, res) => {
  const { id } = req.params;
  const { busNumber, latitude, longitude } = req.body;

  try {
    const locationToUpdate = await db.BusLocation.findOne({
      where: { id: id },
    });

    if (!locationToUpdate) {
      return res.status(404).send({ message: "Localização não encontrada." });
    }

    const updatedLocation = await locationToUpdate.update({
      busNumber,
      latitude,
      longitude,
      timestamp: new Date(),
    });

    res.status(200).send({
      message: "Localização atualizada com sucesso.",
      data: updatedLocation,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Erro ao atualizar a localização.", error });
  }
});

// Rota para deletar uma localização por ID
router.delete("/bus-location/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const locationToDelete = await db.BusLocation.findOne({
      where: { id: id },
    });

    if (!locationToDelete) {
      return res.status(404).send({ message: "Localização não encontrada." });
    }

    await locationToDelete.destroy();

    res.status(200).send({ message: "Localização deletada com sucesso." });
  } catch (error) {
    res.status(500).send({ message: "Erro ao deletar a localização.", error });
  }
});

module.exports = router;
