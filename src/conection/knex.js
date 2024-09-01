const knex = require("knex")({
  client: "pg",
  connection: {
    port: process.env.PORT,
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBDATABASE,
    ssl: {rejectUnauthorized: false}
  }
});

module.exports = knex;