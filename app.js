const express = require("express");
const bodyParser = require("body-parser");

const routers = require("./routers/index");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const port = 4005;

app.get("/", (req, res) => { 
  res.send("<h1>Hello World!</h1>");
});

app.use(routers);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});