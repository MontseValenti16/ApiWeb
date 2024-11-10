const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./app/routes/Paciente.routes.js")(app)
require("./app/routes/Medicamento.routes.js")(app);
require("./app/routes/Recetas.routes.js")(app);
require("./app/routes/ListaMedicamentos.routes.js")(app);

app.get("/", (req, res) => {
  res.send("hola montse rata me la vas a pagar");
});

const PORT = 8080

http.createServer(app).listen(PORT, ()=> {
  console.log("servidor en: " + PORT);
});
