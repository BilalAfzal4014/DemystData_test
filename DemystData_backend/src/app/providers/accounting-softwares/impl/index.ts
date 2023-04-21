import {allAccountProviders} from '@type/account-provider-sheet';
import AccountProviderSheetRepo from '@repository/account-provider-sheet';

export default class AccountingSoftware{
    protected name: allAccountProviders;
    constructor(name: allAccountProviders) {
        this.name = name;
    }

    fetchSheet(){
        return AccountProviderSheetRepo.fetchSheetByProviderName(this.name);
    }
}
