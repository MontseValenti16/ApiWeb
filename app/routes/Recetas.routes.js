module.exports = (app) => {
    const receta = require("../controllers/Receta.controllers.js");
  
    const router = require("express").Router();
  
    router.post("/", receta.create);
    router.get("/", receta.findAll);
    router.get("/:id", receta.findOne);
    router.put("/:id", receta.update);
    router.delete("/:id", receta.delete);
    router.delete("/", receta.deleteAll);
  
    app.use("/api/recetas", router);
  };
  