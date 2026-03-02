import express from "express";
import cors from "cors";

//Error handler
import { errorHandler } from "./middleware/error.middleware.js";

//Controller Route
import authRoute from "./modules/auth/auth.routes.js";
import userRoute from "./modules/user/user.route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>{
    res.send("SERVER TURN ON!!!!!!")
});

const v1Router = express.Router();

//Route
v1Router.use("/auth", authRoute)
v1Router.use("/user", userRoute);

app.use("/api/v1", v1Router);

app.use("/", (req, res) => {
    res.status(400).json({ message: "Don't penetrate here!!!"})
});

app.use(errorHandler);

export default app;