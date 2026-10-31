import express from "express";
import * as PlantaController from "@controllers/PlantaController";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.status(200).json({ message: "API do treinamento de CRUD do CITi 💚" });
});

routes.post("/plantas", PlantaController.createPlanta);
routes.get("/plantas", PlantaController.readAllPlantas);
routes.get("/plantas/:id", PlantaController.readPlantaById);
routes.patch("/plantas/:id", PlantaController.updatePlanta);
routes.delete("/plantas/:id", PlantaController.deletePlanta);
routes.post("/plantas/:id/venda", PlantaController.createVenda);
routes.get("/plantas/estoque/valor-total", PlantaController.readValorTotalEstoque);

export default routes;
