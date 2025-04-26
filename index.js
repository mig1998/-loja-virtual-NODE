//mport express from 'express'

const express = require('express');
const app = express()

const cors = require('cors');  // Importa o CORS


app.use(cors());

const userRoutes = require('./back-end/src/routes/userRoutes');

app.use(express.json())

app.use('/users', userRoutes);




app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});