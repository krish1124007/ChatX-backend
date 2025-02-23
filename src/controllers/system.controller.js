import {User} from '../models/user.models.js';
import {AsyncHandler} from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const ListAllUsers = AsyncHandler(async (req, res) => {
    const users = await User.find();
    return res.status(200).json(new ApiResponse(true, 'All users', users));
})

const GetUserById = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    if(!user){
        return res.status(404).json(new ApiResponse(false, 'User not found', null));
    }
    return res.status(200).json(new ApiResponse(true, 'User found', user));

})



export {ListAllUsers, GetUserById}