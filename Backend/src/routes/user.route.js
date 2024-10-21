import { Router } from "express";
import { verifyUser } from '../middlewares/verifyjwt.middileware.js'
import authorizeRoles from '../middlewares/roleMiddleware.js'
import { addUser, getUsers, updateUser, deleteUser, updatePassword, getTotalStudentsAndStaff } from '../controllers/user/userController.js';

const router = Router();

router.route("/").post(verifyUser, authorizeRoles('Admin'), addUser);

router.route("/").get(verifyUser, authorizeRoles('Admin'), getUsers);

router.route("/:id").put(verifyUser, authorizeRoles('Admin'), updateUser);

router.route("/:id").delete(verifyUser, authorizeRoles('Admin'), deleteUser);

router.route("/creds").post(verifyUser, authorizeRoles('Admin'), updatePassword);

router.route("/user/creds").post(verifyUser, updatePassword);

router.route("/stats").get(verifyUser, getTotalStudentsAndStaff);


export default router;