import {allAccountProviders} from '@type/account-provider-sheet';
import AccountingSoftware from '@providers/accounting-softwares/impl/index';

export default class Xero extends AccountingSoftware{
    constructor(name: allAccountProviders) {
        super(name);
    }
}
