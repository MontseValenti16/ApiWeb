const sql = require("../config/db.js");

const ListaMedicamentos = function (listaMedicamentos) {
  this.idMedicamento = listaMedicamentos.idMedicamento;
  this.idReceta = listaMedicamentos.idReceta;
};

ListaMedicamentos.create = (newListaMedicamentos, result) => {
  sql.query("INSERT INTO ListaMedicamentos SET ?", newListaMedicamentos, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Created ListaMedicamentos: ", { idLista: res.insertId, ...newListaMedicamentos });
    result(null, { idLista: res.insertId, ...newListaMedicamentos });
  });
};

ListaMedicamentos.findById = (id, result) => {
  sql.query(`SELECT * FROM ListaMedicamentos WHERE idLista = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("Found ListaMedicamentos: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

ListaMedicamentos.getAll = (result) => {
  sql.query("SELECT * FROM ListaMedicamentos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("ListaMedicamentos: ", res);
    result(null, res);
  });
};

ListaMedicamentos.updateById = (id, listaMedicamentos, result) => {
  sql.query(
    "UPDATE ListaMedicamentos SET idMedicamento = ?, idReceta = ? WHERE idLista = ?",
    [
      listaMedicamentos.idMedicamento,
      listaMedicamentos.idReceta,
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
      console.log("Updated ListaMedicamentos: ", { idLista: id, ...listaMedicamentos });
      result(null, { idLista: id, ...listaMedicamentos });
    }
  );
};

ListaMedicamentos.remove = (id, result) => {
  sql.query("DELETE FROM ListaMedicamentos WHERE idLista = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted ListaMedicamentos with idLista: ", id);
    result(null, res);
  });
};

ListaMedicamentos.removeAll = (result) => {
  sql.query("DELETE FROM ListaMedicamentos", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`Deleted ${res.affectedRows} ListaMedicamentos`);
    result(null, res);
  });
};

ListaMedicamentos.getAllWithDetails = (result) => {
  const query = `
    SELECT 
        M.nombre AS Medicamento,
        M.dosis,
        M.presentacion,
        M.cantidad,
        M.viaAdministracion,
        R.Enfermedad,
        P.nombre AS Paciente,
        P.edad,
        P.sexo
    FROM 
        ListaMedicamentos LM
    JOIN 
        Medicamento M ON LM.idMedicamento = M.id
    JOIN 
        Receta R ON LM.idReceta = R.idReceta
    JOIN 
        Paciente P ON R.idPaciente = P.id;
  `;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};



module.exports = ListaMedicamentos;
