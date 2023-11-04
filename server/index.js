import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";

// #region CONFIGURATIONS
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})
//#endregion

/* Routes */
app.use("/", authRoutes);

//#region MONGOOSE SETUP
const MONGO_URL = "mongodb://0.0.0.0:27017/TradeX";

mongoose.connect(MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  }).catch((error) => console.log(`${error} did not connect`));
//#endregion