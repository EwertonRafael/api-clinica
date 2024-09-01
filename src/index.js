
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
const allowedOrigins = ['https://api-clinica-26if.onrender.com', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requisições de origens permitidas ou sem origem (como o caso de certas requisições feitas via curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`rodando na ulr: http://localhost:${port}`);
})