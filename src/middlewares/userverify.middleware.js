import { User } from "../models/user.models.js";``
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"


export const UserVerify = async (req,res,next)=>
{
    
    const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "") 
    
    if(token == 'null' || token == 'undefined' || !token)
    {
        return res.status(400)
        .json(
            new ApiResponse(400 ,{success:false},"Please Login First")
        )
    }
   

    const Decodeduser = jwt.verify(token ,process.env.JWT_SECRET);
    if(!Decodeduser)
    {
        return res.status(400)
        .json(
            new ApiResponse(400 ,{success:false} ,"Your Access Token is expire Please Login Again")
        )
    }
     const user = await User.findById(Decodeduser.id)
    req.user = user;
    next();
}

