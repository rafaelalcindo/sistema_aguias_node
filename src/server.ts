import dotenv from 'dotenv';
import 'reflect-metadata';
import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';

import uploadConfig from './config/uploads'

dotenv.config();

import './database';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(express.urlencoded());

app.use(
    '/filesshow',
    express.static(uploadConfig.directory)
);

app.use(
    '/qrcode',
    express.static(__dirname + '/assets/qrcodes')
);

app.use(
    '/profile',
    express.static(uploadConfig.directory)
);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    return response.json({
        status: "Error",
        message: error.message
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is runing on port ${process.env.PORT}`)
})

