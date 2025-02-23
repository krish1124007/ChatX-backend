import {User} from '../models/user.models.js';
import {AsyncHandler} from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const options = {
  
    httpOnly: true, // The cookie only accessible by the web server
    secure: true, // Only transmit cookie over https
    sameSite: 'None',
  };


const CreateUser = AsyncHandler(async (req, res) => {
    const {username , password} = req.body;
    
    if(!username || !password){
        return res.status(400).json(new ApiResponse(false, 'Please provide username and password', null));
    }
    const user = await User.create({username, password});


    return res.status(201).json(new ApiResponse(true, 'User created successfully', user));
})

const LoginUser = AsyncHandler(async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json(new ApiResponse(false, 'Please provide username and password', null));
    }
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json(new ApiResponse(false, 'User not found', null));
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json(new ApiResponse(false, 'Invalid credentials', null));
    }
    const AccessToken = user.generateToken();
    if(!AccessToken){
        return res.status(500).json(new ApiResponse(false, 'Error generating token', null));
    }
    res.cookie('AccessToken', AccessToken, options);
    return res.status(200).json(new ApiResponse(true, 'Login successful', {user,AccessToken}));
})

export {CreateUser, LoginUser}