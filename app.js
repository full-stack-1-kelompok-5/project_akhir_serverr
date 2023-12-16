const express = require("express");
const bodyParser = require("body-parser");


const MenuController = require("./controller/menuController");
const OrderController = require("./controller/orderController");
const OrderDetailController = require("./controller/orderDetailController");

const routers = require("./routers/index");

const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const port = 4005;

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.use(routers);

// <----------MENU---------->
// Get menu list



// <----------Order---------->
//Read Order list



//<---------Order Detail---------->



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});