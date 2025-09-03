const express = require('express');
/*const Produto = require('./Produto');*/ 
const app = express();
const router = express.Router();
const verTabela= require('./consults');
const sequelize = require('./banco');

router.get('/tabela', async(req,res)=>{
  try{
      res.status(202).json(await verTabela())
  }
  catch(erro){
    res.status(501).send('Não deu boa piazão')
  }

});

app.get('/minha-view', async (req, res) => {
  try {
    
    const [results, metadata] = await sequelize.query('SELECT * FROM vw_movimentacao_estoque');
    
    res.json(results);
  } catch (error) {
    console.error('Erro ao buscar dados da view:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


module.exports=router
module.exports = sequelize

/*
router.post('/produtos', async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body);
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao inserir produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/produtos', async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    res.status(200).json(produto);
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.put('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [numLinhasAfetadas, produtosAtualizados] = await Produto.update(req.body, {
      where: {
        cod_prod: id
      },
      returning: true 
    });

    if (numLinhasAfetadas === 0) {
      return res.status(404).json({ message: 'Produto não encontrado para atualização.' });
    }
    res.status(200).json(produtosAtualizados[0]);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.delete('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const numLinhasDeletadas = await Produto.destroy({
      where: {
        cod_prod: id
      }
    });

    if (numLinhasDeletadas === 0) {
      return res.status(404).json({ message: 'Produto não encontrado para exclusão.' });
    }
    res.status(200).json({ message: 'Produto excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;

router.use((req, res, next) => {
 
  res.send (`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Erro 404</title>
</head>
<body>
    <img src=""C:\Users\gabri\Downloads\Gemini_Generated_Image_c31vajc31vajc31v.png"" alt="404 erro">
</body>
</html>`);
});
*/


