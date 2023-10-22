import express from 'express';
import { checkToken, decodeToken, khoaApi } from '../config/jwt.js';
import { getListVideo, getListVideoType, getListVideoTypeId, getVideoDetail } from '../controllers/videoController.js';

// định nghĩa những API liên quan đến video
const videoRoutes = express.Router();

// "/getListVideo" -> đi qua middleware (req, res, next) =>{}
// nếu hợp lệ -> đi zô controller
// ko hợp lệ -> báo lỗi
videoRoutes.get("/getListVideo" ,getListVideo);
videoRoutes.get("/getVideoType", getListVideoType);
videoRoutes.get("/getListVideo/:videoTypeId", getListVideoTypeId);
videoRoutes.get("/getVideoDetail/:id", getVideoDetail);

export default videoRoutes;
