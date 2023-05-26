const { Router } = require("express");
const mascota = require("../models/mascota");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const mascotas = await mascota.find({});
    return res.render("mascotas", { mascotas });
  } catch (err) {
    console.log(err);
  }
});

router.get("/crear", (req, res) => {
  res.render("crear");
});

router.post("/crear", async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    //forma rapida
    //await mascota.create(body)
    const newPet = new mascota({
      nombre,
      descripcion,
    });
    await newPet.save();
    console.log("Guardado con exito");
    res.redirect("/pets");
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
