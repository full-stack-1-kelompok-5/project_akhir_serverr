const jwt = require('jsonwebtoken');
const { Waiters } = require("../models");
const bcrypt = require('bcrypt');

class Controller {
    static registerWaiters(req, res)  {
        const body = req.body;
      
        const { username, email, password } = body;
      
        Waiters.create({
          username,
          email,
          password,
        }).then((waiter) => {
          res.status(201).json({ data: { waiter }, msg: "Waiter created successfully" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ data: null, msg: `Error: ${JSON.stringify(error.message)}` });
        });
    }

    static async LoginWaiters(req, res) {
        const body = req.body;
        const { email, password } = body;
      
        try {
          const loggedWaiter = await Waiters.findOne({ where: { email } });
      
          if (!loggedWaiter) {
            return res.status(404).json({ error: "Invalid Email/Password!" });
          }
      
          const valid = bcrypt.compareSync(password, loggedWaiter.password);
      
          
          if (valid) {
            const token = jwt.sign(
              { waiterId: loggedWaiter.id, email: loggedWaiter.email },
              'your-secret-key', 
              { expiresIn: '1h' } 
            );

            res.status(201).json({ data: { waiterId: loggedWaiter.id, token }, msg: "OK" });
          } else {
            
            res.status(404).json({ error: "Invalid Password!" });
          }
        } catch (error) {
          console.error("Error during login:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

module.exports = Controller;
