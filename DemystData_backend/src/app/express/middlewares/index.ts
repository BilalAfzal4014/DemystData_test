import express, {Application, Request, Response, NextFunction} from "express";
import handleHttpResponse from "@errors/handlers/http-response-handler";
import BusinessError from '@errors/business-error';
import ErrorTypes from '@errors/error-types';

const applyMiddlewares = (app: Application) => {
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(cors());
};

const applyErrorMiddlewares = (app: Application) => {
    app.use(pathNotFound());
    app.use(serverErrorMiddleware());
};

const cors = () => (req: Request, res: Response, next: NextFunction) => {

    res.header("Access-control-allow-origin", (process.env.ALLOWED_ORIGIN || "*"));
    res.header("Access-control-allow-headers", "authorization, content-type, auth");

    if (req.method === "OPTIONS") {
        res.header("Access-control-allow-methods", "GET, PUT, POST, PATCH, DELETE");
        return res.status(200).json();
    }

    next();
};


const pathNotFound = () => (req: Request, res: Response, next: NextFunction) => {
    const error: BusinessError = new BusinessError(
        ErrorTypes.NOT_FOUND,
        "Path doesn't exist", [],
        "BusinessError from pathNotFound middleware"
    );
    next(error);
};

const serverErrorMiddleware = () => (error: unknown, req: Request, res: Response, _: NextFunction) => {
    return handleHttpResponse('ERROR', res).handle(error)
};

export default {
    applyMiddlewares,
    applyErrorMiddlewares
};
