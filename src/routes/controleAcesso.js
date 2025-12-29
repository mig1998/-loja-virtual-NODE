function adm(req, res, next) {
  const sessionUser = req.session.user;

  if (!sessionUser) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  if (sessionUser.type !== 'admin') {
    return res.status(403).json({ error: "Apenas admin" });
  }

  next();
}

module.exports = { adm };