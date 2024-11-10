module.exports = (app) => {
    const paciente = require("../controllers/Paciente.controller.js");
  
    const router = require("express").Router();
  
    router.post("/", paciente.create);
    router.get("/", paciente.findAll);
    router.get("/:id", paciente.findOne);
    router.put("/:id", paciente.update);
    router.delete("/:id", paciente.delete);
    router.delete("/", paciente.deleteAll);
  
    app.use("/api/pacientes", router);
  };
  