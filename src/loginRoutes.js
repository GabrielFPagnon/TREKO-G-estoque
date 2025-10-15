const express = require('express');
const router = express.Router();
const Funcionario = require('../models/funcionario'); 

// Usar o bcrypt depois para verificar senhas


router.post('/login', async (req, res) => {
    const { codigo, nome, password } = req.body; 

    console.log('--- Tentativa de Login ---');
    console.log(`Dados recebidos do Front-end: Código=${codigo}, Nome=${nome}, Senha=${password}`);

    try {
        const funcionario = await Funcionario.findOne({
            where: {
                codigo: codigo,
                nome: nome
            }
        });

        if (!funcionario) {
            console.log('Resultado: Funcionário não encontrado no DB.');
            return res.status(401).json({
                message: 'Código, Nome ou Senha incorretos. Verifique suas credenciais.'
            });
        }
        
        console.log(`DB Senha Recuperada (funcionario.password): ${funcionario.password}`);

        const senhaCorreta = (password === funcionario.password); 

        if (senhaCorreta) {
            console.log('Resultado: SUCESSO (Senhas coincidentes).');
            return res.status(200).json({
                message: `Bem-vindo, ${nome}!`,
                token: 'TOKEN-1000' 
            });
        } else {
            console.log('Resultado: FALHA (Senha incorreta).');
            return res.status(401).json({
                message: 'Código, Nome ou Senha incorretos. Verifique suas credenciais.'
            });
        }

    } catch (error) {
        console.error('Erro de login no servidor:', error);
        return res.status(500).json({
            message: 'Erro interno do servidor durante a autenticação.'
        });
    }
});

module.exports = router;
