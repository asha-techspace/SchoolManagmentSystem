import { Router } from "express";
import { verifyUser } from '../middlewares/verifyjwt.middileware.js'
import { addUser, getUsers, updateUser, deleteUser } from '../controllers/user/userController.js';

const router = Router();

router.route("/").post(addUser);

router.route("/").get(getUsers);

router.route("/:id").put(updateUser);

router.route("/:id").delete(deleteUser);


export default router;