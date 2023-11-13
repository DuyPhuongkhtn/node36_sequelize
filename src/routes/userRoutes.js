import express from 'express';
import { login, signUp } from '../controllers/userController.js';

// nơi định nghĩa routes (điều hướng) tới controller
// http://localhost:8080/api/getListUser
const useRoutes = express.Router();
useRoutes.post("/login", login);
useRoutes.post("/sign-up", signUp);

export default useRoutes;