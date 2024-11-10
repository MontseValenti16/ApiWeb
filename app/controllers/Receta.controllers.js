const Receta = require("../models/Receta.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const receta = new Receta({
    idPaciente: req.body.idPaciente,
    Enfermedad: req.body.Enfermedad,
  });

  Receta.create(receta, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Receta.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Receta.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Recetas.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Receta.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Receta with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Error retrieving Receta with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Receta.updateById(req.params.id, new Receta(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Receta with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Error updating Receta with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Receta.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Receta with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Could not delete Receta with id " + req.params.id,
        });
      }
    } else res.send({ message: `Receta was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Receta.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Recetas.",
      });
    else res.send({ message: `All Recetas were deleted successfully!` });
  });
};
