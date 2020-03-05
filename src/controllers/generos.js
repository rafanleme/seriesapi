const categoriaDAO = new (require("../models/Generos"))();

module.exports = {
  async listar(req, res) {
    try {
      const lista = await categoriaDAO.lista();
      if (lista) return res.send(lista);
      res.status(404).send({ erro: "Lista vazia" });
    } catch (erro) {
      console.log(erro);
      res.send(erro);
    }
  },

};
