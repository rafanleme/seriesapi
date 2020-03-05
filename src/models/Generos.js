const baseQuery = require('./baseQuery')

class Categorias {

  lista() {
    return baseQuery('SELECT * FROM generos')
  }

  insere(serie){
    return baseQuery('INSERT INTO generos SET ?', serie)
  }

  atualiza(serie){
    return baseQuery('UPDATE generos SET ? WHERE id = ?'
      , [serie,serie.id])
  }

  buscaPorId(id){
    return baseQuery(' SELECT * FROM generos WHERE id = ? ',id)
  }

  delete(id){
    return baseQuery(" DELETE FROM generos WHERE id = ? ",id)
  }
}

module.exports = Categorias