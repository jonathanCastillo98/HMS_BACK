import express, { Request, Response } from 'express';
import router from './routes';
const cors = require("cors")

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

const app = express();

// Middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use('/', router);


export default app;