import { Router } from "express";
import { verifyUser } from '../middlewares/verifyjwt.middileware.js'
import {  loginUser, loginSuccess, logout } from '../controllers/auth/localAuth.controller.js';

const router = Router();

router.route("/login/success").get(loginSuccess);
router.route('/login').post(loginUser);
router.route('/logout').post(verifyUser, logout);

export default router;