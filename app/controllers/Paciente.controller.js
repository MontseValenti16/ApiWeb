const Paciente = require("../models/Paciente.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const paciente = new Paciente({
    nombre: req.body.nombre,
    email: req.body.email,
    edad: req.body.edad,
    sexo: req.body.sexo,
    telefono: req.body.telefono,
  });

  Paciente.create(paciente, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Paciente.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Paciente.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Pacientes.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Paciente.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Paciente with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Error retrieving Paciente with id " + req.params.id,
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

  Paciente.updateById(req.params.id, new Paciente(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Paciente with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Error updating Paciente with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Paciente.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Not found Paciente with id ${req.params.id}.` });
      } else {
        res.status(500).send({
          message: "Could not delete Paciente with id " + req.params.id,
        });
      }
    } else res.send({ message: `Paciente was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Paciente.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Pacientes.",
      });
    else res.send({ message: `All Pacientes were deleted successfully!` });
  });
};
