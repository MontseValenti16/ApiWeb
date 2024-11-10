module.exports = (app) => {
    const listaMedicamentos = require("../controllers/ListaMedicamentos.controllers.js");
  
    const router = require("express").Router();
  
    router.post("/", listaMedicamentos.create);
    router.get("/", listaMedicamentos.findAll);
    router.get("/:id", listaMedicamentos.findOne);
    router.get("/lista/details", listaMedicamentos.findAllWithDetails);
    router.put("/:id", listaMedicamentos.update);
    router.delete("/:id", listaMedicamentos.delete);
    router.delete("/", listaMedicamentos.deleteAll);
  
    app.use("/api/listaMedicamentos", router);
  };
  