const express = require("express");
const router = express.Router();
const categoriaController = require("../controllers/categoriaController");

const { adm } = require("./controleAcesso");




router.get("/", categoriaController.getCategorias);


router.post("/", adm,categoriaController.createCategoria);


// Rota: atualizar
router.put('/:id',adm, categoriaController.updateCategoria);

router.delete("/:id",adm, categoriaController.deleteCategoria);



module.exports = router;