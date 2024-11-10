const ListaMedicamentos = require("../models/ListaMedicamentos.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const listaMedicamentos = new ListaMedicamentos({
    idMedicamento: req.body.idMedicamento,
    idReceta: req.body.idReceta,
  });

  ListaMedicamentos.create(listaMedicamentos, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the ListaMedicamentos.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  ListaMedicamentos.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ListaMedicamentos.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  ListaMedicamentos.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found ListaMedicamentos with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Error retrieving ListaMedicamentos with id " + req.params.id,
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

  ListaMedicamentos.updateById(req.params.id, new ListaMedicamentos(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found ListaMedicamentos with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Error updating ListaMedicamentos with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  ListaMedicamentos.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found ListaMedicamentos with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Could not delete ListaMedicamentos with id " + req.params.id,
        });
      }
    } else res.send({ message: `ListaMedicamentos was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  ListaMedicamentos.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all ListaMedicamentos.",
      });
    else res.send({ message: `All ListaMedicamentos were deleted successfully!` });
  });
};

exports.findAllWithDetails = (req, res) => {
  ListaMedicamentos.getAllWithDetails((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving the data."
      });
    } else {
      res.send(data);
    }
  });
};
