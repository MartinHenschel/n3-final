// api/server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

// ... restante do código igual ...

app.use(cors());
app.use(express.json());

let usuarios = [];
let proximoId = 1;

// GET todos os usuários
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// GET usuário por ID
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
});

// POST criar novo usuário
app.post('/usuarios', (req, res) => {
  const { nome, email } = req.body;
  const novoUsuario = { id: proximoId++, nome, email };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// PUT atualizar usuário existente
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email } = req.body;
  const usuario = usuarios.find(u => u.id === id);
  if (usuario) {
    usuario.nome = nome;
    usuario.email = email;
    res.json(usuario);
  } else {
    res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
});

// DELETE usuário
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  usuarios = usuarios.filter(u => u.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`✅ API rodando em: http://localhost:${port}`);
});
