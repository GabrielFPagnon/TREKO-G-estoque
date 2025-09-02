
const db = require('./banco')

async function listarCursos(){
   /* await db.connect() */
    let resultado = await db.query('select * from cursos')
    return (resultado.rows)
}


module.exports=listarCursos;