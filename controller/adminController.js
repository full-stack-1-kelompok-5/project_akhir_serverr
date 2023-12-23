const jwt = require('jsonwebtoken');
const { Admin } = require("../models");
const bcrypt = require('bcrypt');

class Controller {
  static registerAdmin(req, res) {
    const body = req.body;
  
    const { username, email, password } = body;
  
    Admin.findOne({ where: { email } })
      .then(existingAdmin => {
        if (existingAdmin) {
          res.status(400).json({ data: null, msg: "Email is already registered" });
        } else {
          
          Admin.create({
            username,
            email,
            password,
          })
            .then(admin => {
              res.status(201).json({ data: { admin }, msg: "Admin created successfully" });
            })
            .catch(error => {
              res.status(500).json({ data: null, msg: `Error: ${JSON.stringify(error.message)}` });
            });
        }
      })
      .catch(error => {
        res.status(500).json({ data: null, msg: `Error: ${JSON.stringify(error.message)}` });
      });
  }
  

    static async LoginAdmin(req, res) {
        const body = req.body;
        const { email, password } = body; 
      
        try {
          const loggedAdmin = await Admin.findOne({ where: { email } });
      
          if (!loggedAdmin) {
            return res.status(404).json({ error: "Invalid Email/Password!" });
          }
      
          const valid = bcrypt.compareSync(password, loggedAdmin.password);
      
          if (valid) {
            const token = jwt.sign(
              { adminId: loggedAdmin.id, email: loggedAdmin.email },
              'your-secret-key', 
              { expiresIn: '1h' } 
            );

            res.status(201).json({ data: { adminId: loggedAdmin.id, token }, msg: "OK" });
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