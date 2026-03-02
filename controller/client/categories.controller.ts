import { Request, Response } from "express";
import Category from "../../models/categories.model";
//[GET] /categories
export const index = async (req: Request, res: Response) => {

  const categories = await Category.findAll({
    raw: true,
    where: {
      deleted: false,
      status: "active"
    }
  });


  res.render("client/pages/categories/index", {
    categories: categories,
    pageTitle: "Danh sách categories"
  });
};