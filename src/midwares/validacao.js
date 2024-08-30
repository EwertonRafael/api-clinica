const knex = require('../conection/knex');
const validarCampos = async (req, res, next) => {
  try {
    const { nome, idade, telefone, email, data_nascimento, cpf, rua, numero, bairro, genero, tipo_sanguineo } = req.body
    if (!nome || !idade || !telefone || !email || !data_nascimento || !cpf || !rua || !numero || !bairro || !genero || !tipo_sanguineo) {
      console.log(nome, idade, telefone, email, data_nascimento, cpf, rua, numero, bairro, genero, tipo_sanguineo)
      return res.status(400).json("Dados do paciente estão faltando");
    }
    next();
  } catch (error) {
    console.log(error)
    return res.status(500).json("Erro interno");
  }
}
const listaVazia = async (req, res, next) => {
  try {
    const lista = await knex("pacientes").select("*")
    if (lista.length === 0) {
      return res.status(404).json("Nenhum paciente na lista");
    }
    next();
  } catch (error) {
    return res.status(500).json("Erro interno");
  }
}
const idValido = async (req, res, next) => {
  try {
    const { id } = req.params
    if (isNaN(id)) {
      return res.status(400).json("Digite um número de identificação válido");
    }
    const paciente = await knex("pacientes").where("id", id).select("*");
    if (paciente.length === 0) {
      return res.status(404).json("id inválido");
    }
    next();
  } catch (error) {
    return res.status(500).json("Erro interno");
  }
}
const emailValido = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email.includes("@") || !email.includes(".com")) {
      return res.status(400).json("email inválido")
    }
    next();
  } catch (error) {
    return res.status(500).json("Erro interno");
  }
}
const validarTamanhoCpf = async (req, res, next) => {
  try {
    const { cpf } = req.body
    if (cpf.length > 11) {
      return res.status(400).json("CPF inválido")
    }
    next();
  } catch (error) {
    return res.status(500).json("Erro interno");
  }
}
const validarCpfJaCadastrado = async (req, res, next) => {
  try {
    const { cpf } = req.body
    const cpfValido = await knex("pacientes").where("cpf", cpf);
    if (cpfValido.length > 0) {
      return res.status(400).json("CPF já cadastrado");
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Erro interno");
  }
}

module.exports = {
  validarCampos,
  listaVazia,
  idValido,
  emailValido,
  validarTamanhoCpf,
  validarCpfJaCadastrado
}