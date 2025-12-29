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
    const { name } = req.body;
    



    const categoria = await categoriaService.createCategoria(name);

    res.status(201).json(categoria);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};


exports.updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;




    const categoriaAtualizada = await categoriaService.updateCategoria(id, name);

    if (!categoriaAtualizada) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    res.status(200).json(categoriaAtualizada);

  } catch (err) {
    console.error("Erro ao atualizar categoria:", err);
    res.status(500).json({ message: "Erro interno ao atualizar categoria" });
  }
};



exports.deleteCategoria = async (req, res) => {
  try {
    
    
    
    await categoriaService.deleteCategoria(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao deletar categoria" });
  }
};


