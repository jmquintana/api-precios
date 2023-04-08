import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import handlebars from "express-handlebars";

const app = express();
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 8000;

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(`${__dirname}/public`));
app.use("/", viewsRouter);

app.get("/", function (req, res) {
	res.json("This is my webscraper");
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
