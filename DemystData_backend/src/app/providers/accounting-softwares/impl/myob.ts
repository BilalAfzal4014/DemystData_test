import {allAccountProviders} from '@type/account-provider-sheet';
import AccountingSoftware from '@providers/accounting-softwares/impl/index';

export default class Myob extends AccountingSoftware{
    constructor(name: allAccountProviders) {
        super(name);
    }
}
