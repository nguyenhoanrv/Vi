var config = {
    client: "pg",
    connection: {
        host: "localhost",
        user: "postgres",
        password: "vianh1712",
        database: "todo",
        charset: "utf8"
    }
};
var knex = require("knex")(config);
module.exports = knex;