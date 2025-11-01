const express = require('express');
const router = express.Router();
const Funcionario = require('../models/Funcionario'); 
// NOTA: Para produção, use 'bcrypt' para hashear e comparar senhas.

router.post('/login', async (req, res) => {
  const { codigo, nome, password } = req.body;

  console.log('--- Tentativa de Login Recebida ---');
  console.log(`Dados: Código=${codigo}, Nome=${nome}`);

  if (!codigo || !nome || !password) {
    console.log('Falha: Campos ausentes.');
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
  }

  try {
    const funcionario = await Funcionario.findOne({
      where: { codigo: codigo, nome: nome }
    });

    if (!funcionario) {
      console.log('Resultado: Funcionário não encontrado no DB.');
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Verificação de senha em texto plano (NÃO FAÇA ISSO EM PRODUÇÃO)
    const senhaCorreta = (password === funcionario.password);

    if (senhaCorreta) {
      console.log('Resultado: SUCESSO. Login autorizado.');
      return res.status(200).json({
        message: `Bem-vindo, ${funcionario.nome}!`,
        token: 'fake-jwt-token-12345' // Em um app real, gere um JWT aqui
      });
    }

    console.log('Resultado: FALHA (Senha incorreta).');
    return res.status(401).json({ message: 'Credenciais inválidas.' });

  } catch (error) {
    console.error('Erro interno no servidor durante o login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

module.exports = router;