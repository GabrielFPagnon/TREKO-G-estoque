const express = require('express');
const router = express.Router();
const Produto = require('./models/Produto');

// CREATE (Inserção) - POST /produtos
router.post('/produtos', async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;
    const produto = await Produto.create({ nome, descricao, preco });
    return res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao criar o produto' });
  }
});

// READ (Seleção) - GET /produtos
router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    return res.status(200).json(produtos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar os produtos' });
  }
});

// READ (Seleção por ID) - GET /produtos/:id
router.get('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    return res.status(200).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar o produto' });
  }
});

// UPDATE (Atualização) - PUT /produtos/:id
router.put('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await produto.update({ nome, descricao, preco });
    return res.status(200).json(produto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
});

// DELETE (Exclusão) - DELETE /produtos/:id
router.delete('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await produto.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao deletar o produto' });
  }
});

module.exports = router;

