const { Router } = require("express");

const router = Router();
//Routes
router.get("/", (req, res) => {
  res.render("index", { tittle: "Hola" });
});
router.get("/Servicios", (req, res) => {
  res.render("servicios", { tittle: "Services" });
});

module.exports = router;
