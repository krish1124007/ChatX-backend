import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { router } from './routes/user.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(cors(
    {
        origin: '*',
    }
));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/users', router);


app.get('/',(req,res)=>{
    res.send('API is running');
})


export {app}