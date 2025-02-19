require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',  // Altere para seu usuário do PostgreSQL
  host: 'localhost',
  database: 'cadastro', // Nome do banco de dados
  password: '123456', // Altere para sua senha do PostgreSQL
  port: 5432
});

app.post('/users', async (req, res) => {
  const { name, cpf, birthdate, email } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, cpf, birthdate, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, cpf, birthdate, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('✅ Servidor rodando na porta 3000'));
