const Medicamento = require("../models/Medicamento.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const medicamento = new Medicamento({
    nombre: req.body.nombre,
    dosis: req.body.dosis,
    presentacion: req.body.presentacion,
    cantidad: req.body.cantidad,
    viaAdministracion: req.body.viaAdministracion,
  });

  Medicamento.create(medicamento, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Medicamento.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Medicamento.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Medicamentos.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Medicamento.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Medicamento with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Error retrieving Medicamento with id " + req.params.id,
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

  Medicamento.updateById(req.params.id, new Medicamento(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Medicamento with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Error updating Medicamento with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Medicamento.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Medicamento with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Could not delete Medicamento with id " + req.params.id,
        });
      }
    } else res.send({ message: `Medicamento was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Medicamento.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Medicamentos.",
      });
    else res.send({ message: `All Medicamentos were deleted successfully!` });
  });
};
