import {allAccountProviders} from '@type/account-provider-sheet';

export type application = {
    applicantName: string,
    establishedYear: string,
    latestProfitOrLossSummary?: number,
    preAssessment?: number,
    businessDetails?: string,
}

export type applications = Array<application>;

export type applicationFromUser = application & {
    accountingProvider: allAccountProviders,
    appliedLoanValue: number
}

