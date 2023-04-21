import AccountProviderRepo from '@repository/account-provider';

export default class FetchAccountProvider {
    static fetchAll(){
        return AccountProviderRepo.fetchAll();
    }
}
