import { Router } from "express";
import { verifyUser } from '../middlewares/verifyjwt.middileware.js'
import {  loginUser, loginSuccess } from '../controllers/auth/localAuth.controller.js';

const router = Router();

router.route("/login/success").get(loginSuccess);
router.route('/login').post(loginUser);

export default router;