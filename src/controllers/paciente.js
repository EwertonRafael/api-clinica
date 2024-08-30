const knex = require('../conection/knex');

const listarPacientes = async (req, res) => {
  const lista = await knex("pacientes").select("*")
  return res.status(200).json(lista);
};
const detalharPaciente = async (req, res) => {
  const { id } = req.params
  const paciente = await knex("pacientes").where("id", id).select("*");
  return res.status(200).json(paciente);
};
const cadastrarPaciente = async (req, res) => {
  const { nome, idade, telefone, email, data_nascimento, cpf, rua, numero, bairro, genero, tipo_sanguineo } = req.body;

  const pacienteCadastrado = await knex("pacientes")
    .insert({
      nome,
      idade,
      telefone,
      email,
      data_nascimento,
      cpf,
      rua,
      numero,
      bairro,
      genero,
      tipo_sanguineo
    }).returning("*");
  return res.status(201).json({ "Cadastro Realizado": pacienteCadastrado });
};
const deletarPaciente = async (req, res) => {
  const { id } = req.params
  await knex("pacientes").where("id", id).del()
  res.status(204).json();
};
const atualizarPaciente = async (req, res) => {
  const { id } = req.params
  const { nome, idade, telefone, email, data_nascimento, cpf, rua, numero, bairro, genero, tipo_sanguineo } = req.body;
  const pacienteAtualizado = await knex("pacientes").where("id", id).update({ nome, idade, telefone, email, data_nascimento, cpf, rua, numero, bairro, genero, tipo_sanguineo }).returning("*");
  return res.status(200).json({ "paciente atualizado": pacienteAtualizado });
};

module.exports = {
  listarPacientes,
  detalharPaciente,
  cadastrarPaciente,
  deletarPaciente,
  atualizarPaciente
}