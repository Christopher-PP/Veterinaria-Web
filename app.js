//HTTP SERVER
// const http = require("http");
// const colors = require("colors");
// const server = http.createServer((req, res) => {
//   res.end("Estoy respondiendo a tu solicitud");
// });

// //Configure Port

// const Port = 3000;
// server.listen(Port, () => {
//   console.log("Escuchando solicitudes".blue);
// });

//EXPRESS SERVER
const express = require("express");
const colors = require("colors");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application /json
app.use(bodyParser.json());

//port
const Port = process.env.PORT || 3000;

//DATABASE CONNECTION
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URI + process.env.DATABASE_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

//TEMPLATES ENGINE
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
//Statics
app.use(express.static(__dirname + "/public"));
//routes web
app.use("/", require("./router/RutasWeb"));
app.use("/pets", require("./router/Mascotas"));
//MIDDLEWARE
app.use((req, res, next) => {
  res
    .status(400)
    .render("404", { tittle: "404", description: "Error la pagina no existe" });
});

//Listen
app.listen(Port, () => {
  console.log("Server on port".blue, Port);
  console.log("http://localhost:3000".red);
});
