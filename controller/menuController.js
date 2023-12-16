const { Menu } = require("../models");

class Controller {
    static async ReadMenu(req, res) {
      try {
        const menus = await Menu.findAll();
        res.status(200).json({ data: { menus }, msg: "OK" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
      }
    }

    static async CreateMenu (req, res) {
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
      }

      static async UpdateMenu(req, res) {
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
      }

      static async DeleteMenu(req, res) {
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
      }
  }
  
  module.exports = Controller;