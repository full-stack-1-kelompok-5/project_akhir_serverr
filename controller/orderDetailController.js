const { OrderDetail } = require("../models");

class Controller {
    static async ReadOrderDetail(req, res) {
        try {
          const OrderDetails = await OrderDetail.findAll();
          res.status(201).json({ data: { OrderDetails: OrderDetails }, msg: "OK" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ data: null, msg: `error ${JSON.stringify(error.response?.message)}` });
        }
      }

      static async UpdateOrderDetail(req, res) {
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
      }

      static async DeleteOrderDetail(req, res) {
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
      }

      static async CreateOrderDetail(req, res) {
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
      }
}

module.exports = Controller;