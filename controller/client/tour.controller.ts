import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";
import { Json } from "sequelize/types/utils";
;

//[GET] /tours
export const index = async (req: Request, res: Response) => {
  //select * from tours => findAll() => raw: true => trả về mảng các đối tượng thuần túy
  //where deleted = false => { where: { deleted: false } }

  // const tours = await Tour.findAll({
  //   raw: true,
  //   where: {
  //     deleted: false,
  //     status: "active"
  //   }
  // });

  const slugCategory = req.params.slugCategory;
  console.log(slugCategory);
  const tours = await sequelize.query(`
    SELECT tours.*,price * (1 - discount/100) AS price_special
      FROM tours
      JOIN tours_categories ON tours.id = tours_categories.tour_id
      JOIN categories ON tours_categories.category_id = categories.id
      WHERE
        categories.slug = '${slugCategory}'
        AND categories.deleted = 0
        AND categories.status = 'active'
        AND tours.deleted = 0
        AND tours.status = 'active';
        `,
    { type: QueryTypes.SELECT }
  );

  tours.forEach(item => {
    if (item["images"]) {
      const images = JSON.parse(item["images"]);
      item["image"] = images[0];
    }
  });

  res.render("client/pages/tours/index", {
    tours: tours,
    pageTitle: "Danh sách tours"
  });
};
//[GET] /detail/:slugTour
export const detail = async (req: Request, res: Response) => {
  const slugTour = req.params.slugTour;

  // const tourDetail = await sequelize.query(`
  //   SELECT *
  //     FROM tours
  //     WHERE slug = '${slugTour}'
  //       AND deleted = 0
  //       AND status = 'active';
  //        `,
  //   { type: QueryTypes.SELECT }
  // );

  const tourDetail = await Tour.findOne({
    raw: true,
    where: {
      slug: slugTour,
      deleted: false,
      status: "active"
    }
  });

  console.log(tourDetail);
  tourDetail['images'] = JSON.parse(tourDetail['images']);
  tourDetail['price_special'] = tourDetail['price'] * (1 - tourDetail['discount'] / 100);

  res.render("client/pages/tours/detail", {
    pageTitle: "Chi tiết tour",
    tourDetail: tourDetail
  });
};