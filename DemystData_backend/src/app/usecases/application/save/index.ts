import {applicationFromUser} from '@type/application';
import {accountProviderSheets} from '@type/account-provider-sheet';
import DecisionEngine from '@providers/decision-engine';
import FetchAccountProviderSheet from '@usecases/balance-sheet/fetch';
import LoanRules from '@usecases/application/rules';

export default class SaveApplication {
    private application: applicationFromUser;
    private balanceSheet: accountProviderSheets = [];
    private preAssessment: number = 20;

    constructor(application: applicationFromUser) {
        this.application = application
    }

    saveApplication() {
        return this._fetchBalanceSheet()._applyLoanRules()._save();
    }

    private _fetchBalanceSheet() {
        this.balanceSheet = FetchAccountProviderSheet.fetchProviderSheetByName(this.application.accountingProvider);
        return this;
    }

    private _applyLoanRules() {
        this.preAssessment = LoanRules.apply(this.balanceSheet, this.application.appliedLoanValue, this.preAssessment);
        return this;
    }

    private _save() {
        const application = {
            applicantName: this.application.applicantName,
            establishedYear: this.application.establishedYear,
            latestProfitOrLossSummary: this.balanceSheet?.[0]?.profitOrLoss || 0,
            preAssessment: this.preAssessment,
            businessDetails: this.application.businessDetails,
        };
        (new DecisionEngine(application)).saveApplication();
        return {
            ...application,
            proposedLoanValue: ((this.application.appliedLoanValue * this.preAssessment) / 100).toFixed(2)
        }
    }
}
