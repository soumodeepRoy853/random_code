import express from "express";
import cors from "cors";

//Controller Route
import userRoute from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) =>{
    res.send("SERVER TURN ON!!!!!!")
});

const v1Router = express.Router();

//Route
v1Router.use("/user", userRoute);

app.use("/api/v1", v1Router);

app.use("/", (req, res) => {
    res.status(404).json({ message: "Don't penetrate here!!!"})
});

export default app;