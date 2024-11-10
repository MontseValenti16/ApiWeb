const sql = require("../config/db.js");

const Medicamento = function (medicamento) {
  this.nombre = medicamento.nombre;
  this.dosis = medicamento.dosis;
  this.presentacion = medicamento.presentacion;
  this.cantidad = medicamento.cantidad;
  this.viaAdministracion = medicamento.viaAdministracion;
};

Medicamento.create = (newMedicamento, result) => {
  sql.query("INSERT INTO Medicamento SET ?", newMedicamento, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created Medicamento: ", { id: res.insertId, ...newMedicamento });
    result(null, { id: res.insertId, ...newMedicamento });
  });
};

Medicamento.findById = (id, result) => {
  sql.query(`SELECT * FROM Medicamento WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Found Medicamento: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Medicamento.getAll = (result) => {
  sql.query("SELECT * FROM Medicamento", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Medicamentos: ", res);
    result(null, res);
  });
};

Medicamento.updateById = (id, medicamento, result) => {
  sql.query(
    "UPDATE Medicamento SET nombre = ?, dosis = ?, presentacion = ?, cantidad = ?, viaAdministracion = ? WHERE id = ?",
    [
      medicamento.nombre,
      medicamento.dosis,
      medicamento.presentacion,
      medicamento.cantidad,
      medicamento.viaAdministracion,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Updated Medicamento: ", { id: id, ...medicamento });
      result(null, { id: id, ...medicamento });
    }
  );
};

Medicamento.remove = (id, result) => {
  sql.query("DELETE FROM Medicamento WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted Medicamento with id: ", id);
    result(null, res);
  });
};

Medicamento.removeAll = (result) => {
  sql.query("DELETE FROM Medicamento", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`Deleted ${res.affectedRows} Medicamentos`);
    result(null, res);
  });
};

module.exports = Medicamento;
