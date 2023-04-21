import express, {Router, Request, Response, NextFunction} from 'express';
import {allAccountProviders} from '@type/account-provider-sheet';
import FetchAccountProviderSheetUsecase from '@usecases/balance-sheet/fetch';
import handleHttpResponse from '@errors/handlers/http-response-handler';
import BusinessError from '@errors/business-error';
import ErrorTypes from "@errors/error-types";

const router: Router = express.Router();

router.get('/:provider', (req: Request, res: Response, next: NextFunction) => {
    const isProviderExist = ['Xero', 'Myob'].includes(req.params.provider);
    if(!isProviderExist){
        throw new BusinessError(
            ErrorTypes.NOT_FOUND,
            `Provider type not allowed`, [`Provider doesn't exist`],
            'BusinessError from balance sheet provider route'
        );
    }
    next();
}, (req: Request, res: Response, next: NextFunction) => {
    try {
        const accountProviders = FetchAccountProviderSheetUsecase.fetchProviderSheetByName(req.params.provider as allAccountProviders);
        return handleHttpResponse('SUCCESS', res).handle({
            data: accountProviders, message: 'Account provider sheet'
        });
    } catch (error) {
        next(error);
    }
});


export default router;
