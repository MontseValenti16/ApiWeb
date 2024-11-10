const sql = require("../config/db.js");

const Paciente = function (paciente) {
  this.nombre = paciente.nombre;
  this.email = paciente.email;
  this.edad = paciente.edad;
  this.sexo = paciente.sexo;
  this.telefono = paciente.telefono;
};

Paciente.create = (newPaciente, result) => {
  sql.query("INSERT INTO Paciente SET ?", newPaciente, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created Paciente: ", { id: res.insertId, ...newPaciente });
    result(null, { id: res.insertId, ...newPaciente });
  });
};

Paciente.findById = (id, result) => {
  sql.query(`SELECT * FROM Paciente WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found paciente: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Paciente.getAll = (result) => {
  sql.query("SELECT * FROM Paciente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("Pacientes: ", res);
    result(null, res);
  });
};

Paciente.updateById = (id, paciente, result) => {
  sql.query(
    "UPDATE Paciente SET nombre = ?, email = ?, edad = ?, sexo = ?, telefono = ? WHERE id = ?",
    [paciente.nombre, paciente.email, paciente.edad, paciente.sexo, paciente.telefono, id],
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
      console.log("updated Paciente: ", { id: id, ...paciente });
      result(null, { id: id, ...paciente });
    }
  );
};

Paciente.remove = (id, result) => {
  sql.query("DELETE FROM Paciente WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted Paciente with id: ", id);
    result(null, res);
  });
};

Paciente.removeAll = (result) => {
  sql.query("DELETE FROM Paciente", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} Pacientes`);
    result(null, res);
  });
};

module.exports = Paciente;
