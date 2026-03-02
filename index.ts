import express, { Express } from "express";
import dotenv from "dotenv";
import clientRoutes from "./routes/client/index.route";
import moment from "moment";
import bodyParser = require("body-parser");
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/config";
import path from "path";
dotenv.config();



const app: Express = express();
const port: number | string = process.env.PORT || 3000;

//tiniMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");


//app local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//app veriacles moment
app.locals.moment = moment;
//client routes
clientRoutes(app);

//admin routes

adminRoutes(app);

app.listen(port, () => {
  console.log(`Tour App is listening on http://localhost:${port}`);
});