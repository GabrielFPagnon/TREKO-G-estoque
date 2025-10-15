const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { codigo, nome, password } = req.body; 

    
    const isValid = (codigo === '123' && nome === 'Gabriel' && password === 'secreta'); 
    
    if (isValid) {
        return res.status(200).json({
            message: `Bem-vindo, ${nome}!`,
            token: 'TOKEN-1000' 
        });
    } else {
        return res.status(401).json({
            message: 'Código, Nome ou Senha incorretos. Verifique suas credenciais.'
        });
    }
});

module.exports = router;