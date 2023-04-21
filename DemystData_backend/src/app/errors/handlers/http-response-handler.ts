import {Response} from 'express';
import BusinessError from '@errors/business-error';
import ErrorTypes from '@errors/error-types';
import {responseType} from '@type/http-response';

class HttpResponseHandler {
    protected resp: Response;
    protected readonly responseFormat: responseType;

    constructor(resp: Response, isErrorResponse = false) {
        this.resp = resp;
        this.responseFormat = {
            status: null,
            data: {},
            message: "",
            ...(isErrorResponse && {errors: []})
        };
    }
}

class HttpErrorResponseHandler extends HttpResponseHandler {

    constructor(resp: Response) {
        super(resp, true);
    }

    handle(error: BusinessError | any) {
        if (error instanceof BusinessError) {
            this.handleBusinessError(error);
        } else if (error instanceof Error) {
            this.handleApplicationError(error);
        }
    }

    handleBusinessError(error: BusinessError) {

        switch (error.type) {
            case ErrorTypes.EMAIL_REQUIRED_SOCIAL:
                this.responseFormat.status = 210;
                break;
            case ErrorTypes.NOT_FOUND:
                this.responseFormat.status = 400;
                break;
            case ErrorTypes.FORBIDDEN:
                this.responseFormat.status = 403;
                break;
            case ErrorTypes.DUPLICATE_DATA:
                this.responseFormat.status = 401;
                break;
            case ErrorTypes.MISSING_DATA:
                this.responseFormat.status = 400;
                break;
            case ErrorTypes.MISSING_ATTRIBUTES:
                this.responseFormat.status = 400
                break;
            default:
                this.responseFormat.status = 400;
        }
        console.trace("Business Error", error.errorLocation, new Date(), error);
        this.responseFormat.errors = error.extraInfo;
        this.responseDataFillUp(this.responseFormat.status, error.data ? error.data : {}, error.message);
        this.resp.status(this.responseFormat.status).json(this.responseFormat);
    }

    handleApplicationError(error: any) {
        console.trace("Application Error", new Date(), error);
        this.responseDataFillUp(500, {}, "Server error occurred");
        this.resp.status(500).json(this.responseFormat)
    }

    responseDataFillUp(status: number, data: BusinessError | any, message: string = "") {
        this.responseFormat.status = status;
        this.responseFormat.data = data;
        this.responseFormat.message = message;
    }

};


class HttpSuccessResponseHandler extends HttpResponseHandler {
    constructor(resp: Response) {
        super(resp);
    }

    handle(result: any) {
        const {data, message} = result;
        this.responseFormat.status = 200;
        this.responseFormat.data = data;
        this.responseFormat.message = message;
        this.resp.status(200).json(this.responseFormat)
    }
};


export default function handleHttpResponse(type: 'SUCCESS' | 'ERROR', res: Response) {
    switch (type) {
        case 'ERROR':
            return new HttpErrorResponseHandler(res);
        case 'SUCCESS':
            return new HttpSuccessResponseHandler(res);
    }
}
