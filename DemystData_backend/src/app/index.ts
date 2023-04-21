import express, {Application} from "express";
const app: Application = express();

import middlewaresManager from '@middlewares/index';
import routesManager from "@routes/index";

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
middlewaresManager.applyMiddlewares(app);
routesManager.setupRoutes(app);
middlewaresManager.applyErrorMiddlewares(app);
export default app;
