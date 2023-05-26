const mongoose = require("mongoose");

const mascotaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
});

module.exports = mongoose.model("mascota", mascotaSchema);
