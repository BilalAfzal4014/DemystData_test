import express, {Router, Request, Response, NextFunction} from 'express';
import FetchAccountProviderUseCase from '@usecases/account-provider/fetch';
import handleHttpResponse from "@errors/handlers/http-response-handler";


const router: Router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const accountProviders = FetchAccountProviderUseCase.fetchAll();
        return handleHttpResponse('SUCCESS', res).handle({
            data: accountProviders, message: 'All account providers'
        });
    } catch (error) {
        next(error);
    }
});


export default router;
