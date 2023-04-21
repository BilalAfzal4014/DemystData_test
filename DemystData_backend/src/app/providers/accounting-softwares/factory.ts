import {allAccountProviders} from '@type/account-provider-sheet';
import Xero from '@providers/accounting-softwares/impl/xero';
import Myob from '@providers/accounting-softwares/impl/myob';

export default function AccountingSoftwareFactory(type: allAccountProviders){
    switch (type){
        case 'Xero':
            return new Xero(type);
        case 'Myob':
            return new Myob(type);
    }
}
