import { Router } from "express";
import { verifyUser } from '../middlewares/verifyjwt.middileware.js'
import authorizeRoles from '../middlewares/roleMiddleware.js'
import { addUser, getUsers, updateUser, deleteUser } from '../controllers/user/userController.js';

const router = Router();

router.route("/").post(verifyUser, authorizeRoles('Admin'), addUser);

router.route("/").get(verifyUser, authorizeRoles('Admin'), getUsers);

router.route("/:id").put(verifyUser, authorizeRoles('Admin'), updateUser);

router.route("/:id").delete(verifyUser, authorizeRoles('Admin'), deleteUser);


export default router;