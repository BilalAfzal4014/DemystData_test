import { accountProviders } from '@models/account-provider';

export default class AccountProvider {
    static fetchAll() {
        return accountProviders;
    }
}
