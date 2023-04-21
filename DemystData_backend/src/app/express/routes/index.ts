import express, {Application, Router} from 'express';
import accountProviderRoutes from '@routes/account-provider';
import balanceSheetRoutes from '@routes/balance-sheet';
import applicationRoutes from '@routes/application';


const setupRoutes = (app: Application) => {
    const router: Router = express.Router();
    router.use("/account-providers", accountProviderRoutes);
    router.use("/balance-sheets", balanceSheetRoutes);
    router.use("/applications", applicationRoutes);
    app.use("/v1", router);
};

export default {
    setupRoutes
};
