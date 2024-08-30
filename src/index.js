const express = require('express');
const envFile = process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev';
require("dotenv").config({ path: envFile });

const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require('./swagger.json');
const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const cors = require('cors');
const rotas = require('./routers/rotas');

app.use(express.json());
app.use(rotas);
app.use(cors());
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`rodando na ulr: http://localhost:${port}`);
})