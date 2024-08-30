const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBDATABASE
  }, ssl: {
    rejectUnauthorized: false
  },
  sslmode: 'require'
});

module.exports = knex;