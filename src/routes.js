const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

/* 
  Rotas para gerenciamento de produtos 
*/
router.post('/produtos', async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;
    if (!nome || preco === undefined) {
      return res.status(400).json({ error: 'Nome e Preço são obrigatórios.' });
    }
    const produto = await Produto.create({ nome, descricao, preco });
    return res.status(201).json(produto);
  } catch (error) {
    console.error('Erro ao criar o produto:', error);
    return res.status(500).json({ error: 'Erro ao criar o produto' });
  }
});

router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    return res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao buscar os produtos:', error);
    return res.status(500).json({ error: 'Erro ao buscar os produtos' });
  }
});

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
    console.error('Erro ao atualizar o produto:', error);
    return res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
});


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
    console.error('Erro ao deletar o produto:', error);
    return res.status(500).json({ error: 'Erro ao deletar o produto' });
  }
});

module.exports = router;