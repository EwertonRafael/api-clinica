const cors = require('cors');
require("dotenv").config();
const express = require('express');
const rotas = require('./routers/rotas');
const app = express();

app.use(express.json());
app.use(rotas);
app.use(cors());
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`rodando na ulr: http://localhost:${port}`);
})