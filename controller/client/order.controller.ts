import { Request, Response } from "express";
import Order from "../../models/order.model";
import { generateCode } from "../../helper/generate";
import { where } from "sequelize";
import Tour from "../../models/tour.model";
import OrderItem from "../../models/order-item.model";




//[GET] /order
export const index = async (req: Request, res: Response) => {
  const data = req.body;
  const orderData = {
    code: "",
    fullName: data.info.fullName,
    phone: data.info.phone,
    note: data.info.note,
    status: "initial",

  }
  const order = await Order.create(orderData);
  const orderId = order.dataValues.id;
  const code = generateCode(orderId);
  await order.update({ code }, { where: { id: orderId } });
  console.log(order);
  console.log(data);

  for (const item of data.cart) {
    const dataItems = {
      orderId: orderId,
      tourId: item.tourId,
      quantity: item.quantity,

    }

    const infoTour = await Tour.findOne({
      where: {
        id: item.tourId,
        deleted: false
      }, raw: true
    });
    dataItems['price'] = infoTour['price'];
    dataItems['discount'] = infoTour['discount'];
    dataItems['timeStart'] = infoTour['timeStart'];

    console.log(dataItems);
    await OrderItem.create(dataItems);

  }

  res.json({
    code: 200,
    message: "Dat hang thanh cong",
    orderCode: code
  });
};

export const success = async (req: Request, res: Response) => {
  const orderCode = req.query.orderCode;
  const order = await Order.findOne({
    where: {
      code: orderCode,
      deleted: false
    },
    raw: true
  });

  ;
  const orderItems = await OrderItem.findAll({
    where: {
      orderId: order["id"]
    },
    raw: true,
  });



  for (const item of orderItems) {
    item["price_special"] = item["price"] * (1 - item["discount"] / 100);
    item["total"] = item["price_special"] * item["quantity"];

    const infoTour = await Tour.findOne({
      where: {
        id: item["tourId"],
        deleted: false
      },
      raw: true
    });
    item["title"] = infoTour["title"];
    item["slug"] = infoTour["slug"];
    item["image"] = JSON.parse(infoTour["images"])[0];

  }
  console.log(orderItems);
  order["total_price"] = orderItems.reduce((total, item) => total + item["total"], 0);
  console.log(order)
  res.render("client/pages/order/success", {
    title: "Đặt hàng thành công",
    order: order,
    orderItems: orderItems
  });
}


