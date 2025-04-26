import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import accountRoutes from "./src/routes/account.js";
import userRoutes from "./src/routes/user.js";
import refreshRoutes from "./src/routes/refresh.js";
import tagRoutes from "./src/routes/tag.js";
import tradeRoutes from "./src/routes/trade.js";
import apiTradeRoutes from "./src/routes/apiTrade.js";
import dotenv from "dotenv";
import helmet from "helmet";
import { ErrorHandler } from "./src/middleware/catchError.js";
import corsOptions from "./src/config/corsOptions.js";
import credentials from "./src/config/corsCredentials.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { calculateFeesByExchange } from './src/helpers/fees.js';

//#region CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.json());
app.use(cookieParser());
//#endregion

//#region App Routes
app.use("/api", authRoutes);
app.use("/api", apiTradeRoutes);
app.use("/api", refreshRoutes);
app.use("/api", userRoutes);
app.use("/api", accountRoutes);
app.use("/api", tagRoutes);
app.use("/api", tradeRoutes);
//#endregion

//#region Static files
app.use(express.static(path.join(__dirname, '../client/build')));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
});
//#endregion

//#region MONGOOSE SETUP
mongoose.connect(process.env.MONGO_LOCAL_URL, {
  dbName: process.env.DATABASE_NAME
}).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
//#endregion

//#region Error Handling
app.use(ErrorHandler);
//#endregion

// console.log(calculateFeesByExchange("Binance", 1.5000, 1.5001, 100));