import express from 'express';
import { khoaApi } from '../config/jwt.js';
import { login, loginFacebook, signUp, updateUser } from '../controllers/userController.js';

// nơi định nghĩa routes (điều hướng) tới controller
// http://localhost:8080/api/getListUser
const useRoutes = express.Router();
useRoutes.post("/login", login);
useRoutes.post("/sign-up", signUp);
useRoutes.post("/login-facebook", loginFacebook);
useRoutes.put("/update-user", khoaApi ,updateUser)

export default useRoutes;