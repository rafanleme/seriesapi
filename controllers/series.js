const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
series = (app) => {
  
  app.get('/series', (req, res) => {
    var seriesDao = app.models.Series

    seriesDao.lista()
      .then(resultado => {
        res.send(resultado)
      })
      .catch(erro =>{
        console.log('Erro ao consultar' + erro)
        res.status(500).send(erro)
      })
  })

  app.post('/series', (req,res) => {
    const seriesDao = app.models.Series

    let serie = req.body;

    seriesDao.insere(serie)
      .then(resultado => {
        const insertId = resultado.insertId;
        serie = {id:insertId, ...serie}
        res.status(201).send(serie)
      })
      .catch(erro =>{
        console.log('erro ao inserir ' + erro)
        res.status(500).send(erro)
      })
  })

  app.get('/series/:id', (req,res) => {
    const id = req.params.id

    const seriesDao = app.models.Series
    seriesDao.buscaPorId(id)
      .then(serie => {
        console.log(serie)
        if(!serie){
          res.status(404).send({erro: 'série não encontrada'})
          return
        } 
        res.send(serie)
      })
      .catch(erro => {
        console.log('erro ao buscar serie')
        res.status(500).send({erro: 'erro ao buscar'})
      })
  })

  app.put('/series/:id', (req,res) => {
    const id = req.params.id
    const serie = req.body
    serie.id = id

    seriesDao = app.models.Series
    seriesDao.atualiza(serie)
      .then(retorno => {
        if(!retorno.affectedRows){
          res.status(404).send({erro: 'Serie não encontrada'})
          return
        }
        res.send(serie)
      })
      .catch(erro => res.status(500).send(erro))
  })

  app.delete('/series/:id', (req,res)=>{
    const id = req.params.id

    seriesDao = app.models.Series

    seriesDao.delete(id)
      .then(retorno => {
        if(!retorno.affectedRows){
          res.status(404).send({erro: 'Serie não encontrada'})
          return
        }
        res.status(204).send()
      })
      .catch(erro => {
        console.log('Erro ao deletar' + erro)
        res.status(500).send({erro: 'erro ao remover'})
      })
  })
}

module.exports = series