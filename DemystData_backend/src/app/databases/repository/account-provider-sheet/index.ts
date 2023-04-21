import {allAccountProviders} from '@type/account-provider-sheet';
import accountProviderSheets from '@models/account-provider-sheet';


export default class AccountProviderSheet {
    static fetchSheetByProviderName(name: allAccountProviders) {
        return accountProviderSheets[name];
    }
}
