const seriesDAO = new (require("../models/Series"))();
const multer = require("multer");
const fs = require('fs')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./fotos");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  }
});

fileFilter = (req, file, cb) => {
  const ext = file.mimetype.split("/").pop();
  if (!["jpeg", "png"].includes(ext)) {
    req.erro = "Tipo de arquivo inválido";
    cb(null, false);
  } else cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
}).single("foto");

module.exports = {
  async listar(req, res) {
    try {
      const lista = await seriesDAO.lista();
      if (lista) return res.send(lista);
      res.status(404).send({ erro: "Lista vazia" });
    } catch (erro) {
      console.log(erro);
      res.send(erro);
    }
  },

  async insere(req, res) {
    let serie = req.body;
    try {
      const resultado = await seriesDAO.insere(serie);
      const insertId = resultado.insertId;
      serie = { id: insertId, ...serie };
      return res.status(201).send(serie);
    } catch (erro) {
      return res.status(500).send(erro);
    }
  },

  uploadFoto(req, res) {
    console.log(req.file)
    upload(req, res, erro => {
      if (req.erro) return res.status(400).send({ erro: req.erro });
      const serie = {};
      serie.id = req.params.id;
      serie.foto = req.file.filename;
      console.log(serie)
      seriesDAO.atualiza(serie).then(retorno => {
        if (!retorno.affectedRows){
          fs.unlinkSync('./fotos/' + serie.foto)
          return res.status(404).send({ erro: "Serie não encontrada" });
        }

        return res.send(serie);
      });
    });
  },

  async buscaPorId(req, res) {
    const id = req.params.id;
    let serie = await seriesDAO.buscaPorId(id);
    serie = serie[0];
    if (!serie) return res.status(404).send({ erro: "série não encontrada" });
    res.send(serie);
  },

  async atualiza(req, res) {
    const id = req.params.id;
    const serie = req.body;
    serie.id = id;

    const retorno = await seriesDAO.atualiza(serie);
    if (!retorno.affectedRows)
      return res.status(404).send({ erro: "Serie não encontrada" });

    res.send(serie);
  },

  async delete(req, res) {
    const id = req.params.id;
    const retorno = await seriesDAO.delete(id);
    if (!retorno.affectedRows)
      return res.status(404).send({ erro: "Serie não encontrada" });
    res.status(204).send();
  }
};
