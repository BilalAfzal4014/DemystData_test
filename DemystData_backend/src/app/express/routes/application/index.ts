import express, {Router, Request, Response, NextFunction} from 'express';
import SaveApplicationUseCase from '@usecases/application/save';
import handleHttpResponse from "@errors/handlers/http-response-handler";


const router: Router = express.Router();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const application = (new SaveApplicationUseCase(req.body)).saveApplication();
        return handleHttpResponse('SUCCESS', res).handle({
            data: application, message: 'Application saved successfully'
        });
    } catch (error) {
        next(error);
    }
});


export default router;
