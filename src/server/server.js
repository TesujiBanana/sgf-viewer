import express from "express";

const app = express();

app.set("views", "./views");
app.set("view engine", "hbs");

app.get('/*', (req, res) => {
  res.render("index");
});

let server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
