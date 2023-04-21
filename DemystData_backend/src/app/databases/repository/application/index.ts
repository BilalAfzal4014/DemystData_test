import {application as applicationType} from '@type/application';
import applicationModel from '@models/application';


export default class Application {
    static save(application: applicationType) {
        applicationModel.push(application);
        return application;
    }
}
