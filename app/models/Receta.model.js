const sql = require("../config/db.js");

const Receta = function (receta) {
  this.idPaciente = receta.idPaciente;
  this.Enfermedad = receta.Enfermedad;
};

Receta.create = (newReceta, result) => {
  sql.query("INSERT INTO Receta SET ?", newReceta, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created Receta: ", { idReceta: res.insertId, ...newReceta });
    result(null, { idReceta: res.insertId, ...newReceta });
  });
};

Receta.findById = (id, result) => {
  sql.query(`SELECT * FROM Receta WHERE idReceta = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Found Receta: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Receta.getAll = (result) => {
  sql.query("SELECT * FROM Receta", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Recetas: ", res);
    result(null, res);
  });
};

Receta.updateById = (id, receta, result) => {
  sql.query(
    "UPDATE Receta SET idPaciente = ?, Enfermedad = ? WHERE idReceta = ?",
    [
      receta.idPaciente,
      receta.Enfermedad,
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
      console.log("Updated Receta: ", { idReceta: id, ...receta });
      result(null, { idReceta: id, ...receta });
    }
  );
};

Receta.remove = (id, result) => {
  sql.query("DELETE FROM Receta WHERE idReceta = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted Receta with idReceta: ", id);
    result(null, res);
  });
};

Receta.removeAll = (result) => {
  sql.query("DELETE FROM Receta", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`Deleted ${res.affectedRows} Recetas`);
    result(null, res);
  });
};

module.exports = Receta;
