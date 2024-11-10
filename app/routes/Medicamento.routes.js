module.exports = (app) => {
    const medicamento = require("../controllers/Medicamento.controllers.js");
  
    const router = require("express").Router();
  
    router.post("/", medicamento.create);
    router.get("/", medicamento.findAll);
    router.get("/:id", medicamento.findOne);
    router.put("/:id", medicamento.update);
    router.delete("/:id", medicamento.delete);
    router.delete("/", medicamento.deleteAll);
  
    app.use("/api/medicamentos", router);
  };
  