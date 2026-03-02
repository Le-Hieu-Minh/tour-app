import { Request, Response } from "express";
import Category from "../../models/categories.model";

export const index = async (req: Request, res: Response) => {
  const categories = await Category.findAll({
    where: {
      deleted: false
    },
    raw: true
  });
  console.log(categories);

  res.render("admin/pages/categories/index", {
    pageTitle: "Danh sách danh mục",
    categories: categories
  });
}