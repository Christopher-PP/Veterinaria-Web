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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const mascotasdb = await mascota.findOne({ _id: id });
    if (!mascotasdb) {
      return res.render("detalle", {
        error: true,
        adv_messaje: "mascota no encontrada",
      });
    }
    return res.render("detalle", { error: false, mascotasdb });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const mascotaDB = await mascota.findByIdAndDelete({ _id: id });
    if (!mascotaDB) {
      return res.json({
        estado: true,
        message: "Fallo al eliminar!",
      });
    }
    return res.json({
      estado: true,
      message: "Registro Eliminado!",
    });
  } catch (error) {}
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const mascotaDB = await mascota.findByIdAndUpdate(id, body, {
      useFindAndModify: false,
    });
    if (!mascotaDB) {
      return res.json({
        estado: false,
        message: "Fallo la actualizacion!",
      });
    }
    return res.json({
      estado: true,
      message: "Actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
