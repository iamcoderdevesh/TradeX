import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import dotenv from "dotenv";

// #region CONFIGURATIONS
dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
})
//#endregion

/* Routes */
app.use("/", authRoutes);

//#region MONGOOSE SETUP
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  }).catch((error) => console.log(`${error} did not connect`));
//#endregion