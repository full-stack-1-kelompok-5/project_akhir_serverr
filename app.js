const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const { Admin, Waiters, Kitchen, Menu, Order, OrderDetail } = require("./models");

const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const port = 4005;

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});




//<----------Admin---------->
//---get admin
app.get("/Admin", async (req, res) => {
    try {
      const admins = await Admin.findAll();
      res.status(200).json({ data: { admins: admins }, msg: "OK" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
    }
  });

// Register admin

app.post("/Admin", (req, res) =>  {
  const body = req.body;

  const { username, email, password } = body;

  Admin.create({
    username,
    email,
    password,
  }).then((admin) => {
    res.status(201).json(admin);
  }).catch((error) => {
    res.status(500).json(error);
  });
});


//login admin

app.post("/Admin", async(req, res) => {
  const body = req.body;
  const { email, password } = body;

  try {
    const loggedAdmin = await Admin.findOne({ where: { email } });

    // If email not found
    if (!loggedAdmin) {
      return res.status(404).json({ error: "Invalid Email/Password!" });
    }

    const valid = bcrypt.compareSync(password, loggedAdmin.password);

    // If password is valid, send admin ID
    if (valid) {
      res.status(201).json({ data: { adminId: loggedAdmin.id }, msg: "OK" });
      
    } else {
      // If password is invalid
      res.status(404).json({ error: "Invalid Password!" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//<----------Waiters---------->
// Register Waiter
app.post("/Waiters", (req, res) =>  {
  const body = req.body;

  const { username, email, password } = body;

  Waiters.create({
    username,
    email,
    password,
  }).then((waiter) => {
    res.status(201).json({ data: { waiter: waiter }, msg: "Waiter created successfully" });
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ data: null, msg: `Error: ${JSON.stringify(error.message)}` });
  });
});

// Login Waiter
app.post("/Waiters", async(req, res) => {
  const body = req.body;
  const { email, password } = body;

  try {
    const loggedWaiters = await Waiters.findOne({ where: { email } });

    // If email not found
    if (!loggedWaiters) {
      return res.status(404).json({ error: "Invalid Email/Password!" });
    }

    const valid = bcrypt.compareSync(password, loggedWaiters.password);

    // If password is valid, send admin ID
    if (valid) {
      res.status(201).json({ data: { waiterId: loggedWaiter.id }, msg: "Waiter logged in successfully" });
    } else {
      // If password is invalid
      res.status(404).json({ error: "Invalid Password!" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ data: null, msg: `Error: ${error.message}` });
  }
});


//<----------Kitchen---------->
// Register kitchen
app.post("/Kitchen", (req, res) =>  {
    const body = req.body;
  
    const { username, email, password } = body;
  
    Kitchen.create({
      username,
      email,
      password,
    }).then((kitchen) => {
      res.status(201).json(kitchen);
    }).catch((error) => {
      res.status(500).json(error);
    });
  });
  
  // Login Kitchen
  app.post("/Kitchen", async(req, res) => {
    const body = req.body;
    const { email, password } = body;
  
    try {
      const loggedKitchens = await Kitchens.findOne({ where: { email } });
  
      // If email not found
      if (!loggedKitchens) {
        return res.status(404).json({ error: "Invalid Email/Password!" });
      }
  
      const valid = bcrypt.compareSync(password, loggedKitchens.password);
  
      // If password is valid, send admin ID
      if (valid) {
        res.status(201).json({ data: { kitchensId: loggedKitchens.id }, msg: "OK" });
        
        
      } else {
        // If password is invalid
        res.status(404).json({ error: "Invalid Password!" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  



// <----------MENU---------->
// Get menu list
app.get("/Menu", async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.status(200).json({ data: { menus: menus }, msg: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
  }
});

// Create menu
app.post("/Menu", async (req, res) => {
  const body = req.body;

  const { item_name, price, image, adminId, waitersId } = body;

  try {
    const menu = await Menu.create({
      item_name,
      price,
      image,
      adminId,
      waitersId,
    });

    res.status(201).json({ data: { menu: menu }, msg: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
  }
});

// Update menu
app.put("/Menu/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const menu = await Menu.findByPk(id);

    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    await menu.update(body);

    res.status(201).json({ data: { menu: menu }, msg: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
  }
});

// Delete menu
app.delete("/Menu/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const menu = await Menu.findByPk(id);

    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }

    await menu.destroy();

    res.status(201).json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
  }
});


// <----------Order---------->
//Read menu list
app.get("/Order", async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(201).json({ data: { orders: orders }, msg: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
  }
});

// Create Order
app.post("/Order", async (req, res) => {
    const body = req.body;
  
    const { status, subtotal, date, orderDetailId, kitchenId } = body;
  
    try {
      const order = await Order.create({
        status, 
        subtotal, 
        date, 
        orderDetailId, 
        kitchenId
      });
  
      res.status(201).json({ data: { order: order }, msg: "OK" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
    }
  });

//Update order
app.put("/Order/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the order with the new data
    await order.update(body);

    // Retrieve the updated order from the database
    const updatedOrder = await Order.findByPk(id);

    // Respond with the updated order data
    res.status(201).json({ data: { order: updatedOrder }, msg: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, msg: `error ${error.message || "Unknown error"}` });
  }
});

//delete order
app.delete("/Order/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: "Menu not found" });
    }

    await order.destroy();

    res.status(201).json({ message: "Menu deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
  }
});


//<---------Order Detail---------->
app.get("/OrderDetail", async (req, res) => {
  try {
    const OrderDetails = await OrderDetail.findAll();
    res.status(201).json({ data: { OrderDetails: OrderDetails }, msg: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
  }
});

// Update (Edit Order Detail by ID)
app.put("/OrderDetail/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const orderDetail = await OrderDetail.findByPk(id);

    if (!orderDetail) {
      return res.status(404).json({ error: "Order Detail not found" });
    }

    await orderDetail.update({
      ...body,
    });

    res.status(201).json({ data: { orderDetail: orderDetail }, msg: "Order Detail updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, msg: `Error: ${JSON.stringify(error.message)}` });
  }
});


// Delete Order Detail by ID
app.delete("/OrderDetail/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const orderDetail = await OrderDetail.findByPk(id);
  
      if (!orderDetail) {
        return res.status(404).json({ error: "orderDetail not found" });
      }
  
      await orderDetail.destroy();
  
      res.status(201).json({ message: "Order Detail deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
    }
  });


  //Creat Order Detail
  app.post("/OrderDetail", async (req, res) => {
    const body = req.body;
  
    const { order, item, quantity, subtotal, kitchenId, menuId, waitersId } = body;
  
    try {
      const orderDetail = await OrderDetail.create({
        order, 
        item, 
        quantity, 
        subtotal, 
        kitchenId, 
        menuId, 
        waitersId
      });
  
      res.status(201).json({ data: { orderDetail: orderDetail }, msg: "OK" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
    }
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});