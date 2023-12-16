const jwt = require('jsonwebtoken');
const { Kitchen } = require("../models");
const bcrypt = require('bcrypt');

class Controller {
    static RegisterKitchen(req, res)  {
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
    }

    static async LoginKitchen(req, res) {
        const body = req.body;
        const { email, password } = body;
      
        try {
          const loggedKitchen = await Kitchen.findOne({ where: { email } });
      
          if (!loggedKitchen) {
            return res.status(404).json({ error: "Invalid Email/Password!" });
          }
      
          const valid = bcrypt.compareSync(password, loggedKitchen.password);
      
         
          if (valid) {
            const token = jwt.sign(
              { kitchenId: loggedKitchen.id, email: loggedKitchen.email },
              'your-secret-key', 
              { expiresIn: '1h' } 
            );

            res.status(201).json({ data: { kitchenId: loggedKitchen.id, token }, msg: "OK" });
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