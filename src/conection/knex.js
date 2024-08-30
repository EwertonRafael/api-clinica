const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBDATABASE,
    ssl: {rejectUnauthorized: true}
  }
});
if (process.env.NODE_ENV === 'prod') {
  knex.client.config.connection.ssl = { rejectUnauthorized: true };
}

module.exports = knex;