import { Express } from "express";
import { categoryRoutes } from "./category.route";
import { systemConfig } from "../../config/config";
import { tourRoutes } from "./tour.route";
import { uploadRoutes } from "./upload.route"



const adminRoutes = (app: Express): void => {
  const PATH = `/${systemConfig.prefixAdmin}`;
  app.use(`${PATH}/categories`, categoryRoutes);
  app.use(`${PATH}/tours`, tourRoutes);
  app.use(`${PATH}/upload`, uploadRoutes);

};

export default adminRoutes;