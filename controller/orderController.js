const { Order } = require("../models");

class Controller {
    static async ReadOrder (req, res) {
        try {
          const orders = await Order.findAll();
          res.status(201).json({ data: { orders: orders }, msg: "OK" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
        }
      }

      static async CreateOrder(req, res) {
        const body = req.body;
      
        const { subtotal, date, orderDetailId, kitchenId } = body;
      
        try {
          const order = await Order.create({
            status: "order",
            subtotal,
            date,
            orderDetailId,
            kitchenId,
          });
      
          res.status(201).json({ data: { order: order }, msg: "OK" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
        }
      }
      

      static async UpdateOrder(req, res) {
        const { id } = req.params;
        const body = req.body;
      
        try {
          const order = await Order.findByPk(id);
      
          if (!order) {
            return res.status(404).json({ error: "Order not found" });
          }
      
          await order.update(body);
      
          const updatedOrder = await Order.findByPk(id);
      
          res.status(201).json({ data: { order: updatedOrder }, msg: "OK" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ data: null, msg: `error ${error.message || "Unknown error"}` });
        }
      }

      static async DeleteOrder(req, res) {
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
      }
}

module.exports = Controller;