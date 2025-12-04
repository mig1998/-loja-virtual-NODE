const mongoose = require("mongoose");

async function connectDB() {
  try {
      await mongoose.connect("mongodb+srv://Fusioncode:root123456@lojavirtual.a9zubla.mongodb.net/?appName=Lojavirtual");
          console.log("✅ Conectado ao MongoDB!");
            } catch (err) {
                console.error("❌ Erro ao conectar no MongoDB", err);
                    process.exit(1);
                      }
                      }

                      module.exports = connectDB;
                      