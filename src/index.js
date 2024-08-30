const envFile = process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev';
require("dotenv").config({ path: envFile });

const swaggerUi = require("swagger-ui")
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerUi));
const cors = require('cors');
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