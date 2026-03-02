import { Express } from "express";
import { tourRoutes } from "./tour.route";
import { categorieRoutes } from "./categories.route";
import { cartRoutes } from "./cart.route";
import { orderRoutes } from "./order.route";

const clientRoutes = (app: Express): void => {
  app.use(`/tours`, tourRoutes);
  app.use(`/categories`, categorieRoutes);
  app.use(`/cart`, cartRoutes);
  app.use(`/order`, orderRoutes);

};

export default clientRoutes;