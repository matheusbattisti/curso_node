const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));

const products = [
  {
    id: "1",
    title: "Livro",
    price: 12.9,
  },
  {
    id: "2",
    title: "Cadeira",
    price: 200.99,
  },
  {
    id: "3",
    title: "Lâmpada",
    price: 2.0,
  },
];

app.get("/", function (req, res) {
  res.render("home", { products });
});

app.get("/product/:id", function (req, res) {
  const product = products[req.params.id];

  res.render("product", { product });
});

app.listen(3000);
