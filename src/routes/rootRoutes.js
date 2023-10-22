import videoRoutes from "./videoRoutes.js";
import useRoutes from "./userRoutes.js";
import express from 'express';

const rootRoutes = express.Router();
rootRoutes.use("/video", videoRoutes);
rootRoutes.use("/user", useRoutes)

export default rootRoutes;