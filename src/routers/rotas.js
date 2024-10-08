const express = require('express');
const rotas = express.Router();

const { validarCampos, listaVazia, idValido, emailValido, validarTamanhoCpf, validarCpfJaCadastrado } = require("../midwares/validacao")
const { listarPacientes, detalharPaciente, cadastrarPaciente, atualizarPaciente, deletarPaciente } = require("../controllers/paciente");

rotas.get("/listar", listaVazia, listarPacientes);
rotas.get("/detalhar/:id", idValido, detalharPaciente);
rotas.post("/cadastrar", validarCampos, validarTamanhoCpf, validarCpfJaCadastrado, emailValido, cadastrarPaciente);
rotas.put("/atualizar/:id", idValido, validarCampos, validarTamanhoCpf, emailValido, atualizarPaciente);
rotas.delete("/deletar/:id", idValido, deletarPaciente);

module.exports = rotas;