import {allAccountProviders} from '@type/account-provider-sheet';
import AccountingSoftwareFactory from '@providers/accounting-softwares/factory';

export default class FetchAccountProviderSheet {
    static fetchProviderSheetByName(name: allAccountProviders){
        return AccountingSoftwareFactory(name).fetchSheet();
    }
}
