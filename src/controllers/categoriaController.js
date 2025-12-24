const categoriaService = require("../services/categoriaService");

// 🔹 LISTAR CATEGORIAS
exports.getCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.getAllCategorias();
    res.json(categorias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar categorias" });
  }
};

// 🔹 CREATE CATEGORIA  ✅ 
exports.createCategoria = async (req, res) => {
  try {
    const { nome } = req.body;

    const categoria = await categoriaService.createCategoria(nome);

    res.status(201).json(categoria);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};