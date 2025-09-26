const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/lojavirtual");
    console.log("✅ Conectado ao MongoDB!");
  } catch (err) {
    console.error("❌ Erro ao conectar no MongoDB", err);
    process.exit(1);
  }
}

module.exports = connectDB;
