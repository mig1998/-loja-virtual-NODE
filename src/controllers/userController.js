const userService = require('../services/userService');

const cloudinary = require("../../config/cloudinary");



// Controller para buscar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    
    const sessionUser = req.session.user;
  

  // usuário comum só pode editar ele mesmo
  if (sessionUser.type !== 'admin') {
    return res.status(403).json({ error: "Sem permissão" });
  }

    
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).json({ message: "Erro interno ao buscar usuários." });
  }
};




// Controller para criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const { name, email, senha, image} = req.body;


const type="user";

    if (!name || !email || !senha) {
      return res.status(400).json({ message: 'Nome, e-mail e senha são obrigatórios.' });
    }

let imageUrl = null;

        // 📌 SE O USUÁRIO MANDOU IMAGEM
        if (req.file) {
            const upload = await cloudinary.uploader.upload(req.file.path);
            imageUrl = upload.secure_url;
        }

    const newUser = await userService.createUser(name, email, senha, imageUrl, type);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ message: "Erro interno ao criar usuário." });
  }
};



// Buscar usuário por ID
exports.getUserById = async (req, res) => {
  try {
    
    
    const sessionUser = req.session.user;
  

    const user = await userService.getUserById(req.params.id);
    

    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    
    
    
  // usuário comum só pode editar ele mesmo
  if (sessionUser.type !== 'admin' && sessionUser.id !== user._id.toString()){
    return res.status(403).json({ error: "Sem permissão" });
  }
    
    
    
    res.status(200).json(user);
    
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    res.status(500).json({ message: "Erro interno ao buscar usuário." });
  }
};



exports.getUserPerfil = async (req, res) => {
try {
    // Verifica sessão
    const sessionUser = req.session.user;
    if (!sessionUser) {
      return res.status(401).json({ message: "Não autenticado" });
    }

    // Busca dados atualizados no banco
    const id = sessionUser._id || sessionUser.id;

    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json(user);

  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    return res.status(500).json({ message: "Erro interno ao buscar usuário." });
  }
};



// Buscar usuário por nome
exports.getUserByName = async (req, res) => {
  try {
    
    const sessionUser = req.session.user;
    
  // usuário comum só pode editar ele mesmo
  if (sessionUser.type !== 'admin') {
    return res.status(403).json({ error: "Sem permissão" });
  }
    
    const name = String(req.params.name || '').trim();
    if (!name) {
      return res.status(400).json({ message: 'Nome é obrigatório.' });
    }

    const users = await userService.getUserByName(name);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error("Erro ao buscar usuário por nome:", err);
    res.status(500).json({ message: "Erro interno ao buscar usuário." });
  }
};




// Atualizar usuário
// Controller
exports.updateUser = async (req, res) => {
  try {
    
    const sessionUser = req.session.user;
    
    const { id } = req.params;
    const { name, email, senha, image } = req.body; // garantir que veio desestruturado

const type="user";

    
  

  // usuário comum só pode editar ele mesmo
  if (sessionUser.type !== 'admin' && sessionUser.id !== id) {
    return res.status(403).json({ error: "Sem permissão" });
  }



    // 1️⃣ Busca o usuário atual
    const userAtual = await userService.getUserById(id);
    if (!userAtual) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    let imageUrl = userAtual.image; // 👈 mantém a imagem atual

        // 📌 SE O USUÁRIO MANDOU IMAGEM
        if (req.file) {
            const upload = await cloudinary.uploader.upload(req.file.path);
            imageUrl = upload.secure_url;
        }


    const updatedUser = await userService.updateUser(id, name, email, senha, imageUrl, type);

    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json(updatedUser);
    
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).json({ message: "Erro interno ao atualizar usuário." });
  }
};



// Deletar usuário
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const sessionUser = req.session.user;
    
    if (sessionUser.type !== 'admin' && sessionUser.id !== id) {
    return res.status(403).json({ error: "Sem permissão" });
  }

    
    
    const success = await userService.deleteUser(id);

    if (!success) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(204).send();
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    res.status(500).json({ message: "Erro interno ao deletar usuário." });
  }
};



// Adicionar produto ao usuário
exports.adicionarProdutoAoUsuario = async (req, res) => {
  try {
    
    
    const { userId, produtoId } = req.body;
    
    const sessionUser = req.session.user;
    
    
    
    if (sessionUser.type !== 'admin' && sessionUser.id !== userId) {
    return res.status(403).json({ error: "Sem permissão" });
  }
    
    
    const result = await userService.adicionarProdutoAoUsuario(userId, produtoId);

    if (!result) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json({ message: "Produto adicionado com sucesso!" });
  } catch (err) {
    console.error("Erro ao adicionar produto ao usuário:", err);
    res.status(500).json({ message: "Erro interno." });
  }
};



// Adicionar carrinho ao usuário
exports.adicionarCarrinhoAoUsuario = async (req, res) => {
  try {
    const { userId, carrinhoId } = req.body;
    
      

/*
  if (sessionUser.type !== 'admin' && sessionUser.id !== userId) {
    return res.status(403).json({ error: "Sem permissão" });
  }
  */
    
    const result = await userService.adicionarCarrinhoAoUsuario(userId, carrinhoId);

    if (!result) {
      return res.status(400).json({ message: "Não foi possível atribuir carrinho (usuário não encontrado ou já tem carrinho)." });
    }

    res.status(200).json({ message: "Carrinho atribuído ao usuário." });
  } catch (err) {
    console.error("Erro ao atribuir carrinho:", err);
    res.status(500).json({ message: "Erro interno." });
  }
};

// Logout (sessão)
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Erro ao deslogar:", err);
      return res.status(500).send("Erro ao deslogar");
    }
    res.redirect('/login');
  });
};
