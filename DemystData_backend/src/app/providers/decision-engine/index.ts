import {application as applicationType} from '@type/application';
import ApplicationRepo from '@repository/application';

export default class DecisionEngine{
    private readonly application: applicationType;

    constructor(application: applicationType) {
        this.application = application;
    }

    saveApplication(){
        return ApplicationRepo.save(this.application);
    }
}
