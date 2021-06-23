var app = require("express")();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(2000);
var config = {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password:"123456",
      database: "todo",
      charset: "utf8"
    }
  };
var knex = require("knex")(config);
var bookshelf = require("bookshelf")(knex);
var User = bookshelf.Model.extend({
    tableName: "user1"
  });
app.get("/users", async (req, res) => {
    var users = await new User().fetchAll();
    res.json(users);
  });
app.get("/users/:email", async (req, res) => {
    var user = await User.where("email", email).fetch();
    res.json(user);
  });
app.post("/users", async (req, res) => {
    var user = await User.forge({
      name: req.query.name,
      email: req.query.email
    }).save();
    res.json(user);
  });
app.put("/users/:email", async (req, res) => {
    var user = await User.where("email", req.params.email).save(
      { ...req.body },
      { patch: true }
    );
    res.json(user);
  });
app.delete("/users/:email", async (req, res) => {
    var user = await User.where("email", req.params.email).destroy();
    res.json(user);
  });