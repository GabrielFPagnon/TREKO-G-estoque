const express = require('express');
const router = express.Router();
const Funcionario = require('../models/funcionario'); 

// Observação: para produção, armazene senhas hasheadas e compare com bcrypt.
// Aqui mantemos a verificação simples para compatibilidade com o DB atual.

router.post('/login', async (req, res) => {
    const { codigo, nome, password } = req.body;

    console.log('--- Tentativa de Login ---');
    console.log(`Dados recebidos do Front-end: Código=${codigo}, Nome=${nome}`);

    if (!codigo || !nome || !password) {
        return res.status(400).json({ message: 'Parâmetros obrigatórios ausentes.' });
    }

    try {
        const funcionario = await Funcionario.findOne({
            where: { codigo: codigo, nome: nome }
        });

        if (!funcionario) {
            console.log('Resultado: Funcionário não encontrado no DB.');
            return res.status(401).json({ message: 'Código, Nome ou Senha incorretos.' });
        }

        // NÃO logar senhas reais em produção
        const senhaCorreta = (password === funcionario.password);

        if (senhaCorreta) {
            console.log('Resultado: SUCESSO (Senhas coincidentes).');
            // Em produção, gere um JWT em vez de um token estático.
            return res.status(200).json({
                message: `Bem-vindo, ${funcionario.nome}!`,
                token: 'TOKEN-1000',
                user: { id: funcionario.id, nome: funcionario.nome, codigo: funcionario.codigo }
            });
        }

        console.log('Resultado: FALHA (Senha incorreta).');
        return res.status(401).json({ message: 'Código, Nome ou Senha incorretos.' });

    } catch (error) {
        console.error('Erro de login no servidor:', error);
        if (error && error.stack) console.error(error.stack);
        return res.status(500).json({ message: 'Erro interno do servidor durante a autenticação.' });
    }
});

module.exports = router;
