import { Router } from "express";
import {CreateUser, LoginUser} from '../controllers/user.controller.js';
import {ListAllUsers, GetUserById} from '../controllers/system.controller.js';
import {UserVerify} from '../middlewares/userverify.middleware.js';
const router = Router();

router.route('/createuser').post(CreateUser);
router.route('/login').post(LoginUser);
router.route('/users').get(UserVerify,ListAllUsers);
router.route('/usersid/:id').get(UserVerify,GetUserById);

export {router};