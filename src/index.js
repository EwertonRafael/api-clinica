
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.dev';
console.log(process.env.NODE_ENV);
console.log(envFile);

require("dotenv").config({ path: envFile });

const express = require('express');
const swaggerUi = require("swagger-ui-express")
const swaggerDocs = require('./swagger.json');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const rotas = require('./routers/rotas');

app.use(rotas);
app.use(cors());
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`rodando na ulr: http://localhost:${port}`);
})