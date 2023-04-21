import {accountProviderSheets} from '@type/account-provider-sheet';

const rulesConfig = {
    totalMonthCheck: 12,
    profitCaseAssessmentPercentage: 60,
    averageCaseAssessmentPercentage: 100,
};

export default class LoanRules {
    static apply(balanceSheet: accountProviderSheets, appliedLoanValue: number, defaultAssessmentValue = 20) {
        if (balanceSheet.length < rulesConfig.totalMonthCheck) return defaultAssessmentValue;

        return Math.max(
            LoanRules._checkForAlwaysProfitCase(balanceSheet),
            LoanRules._checkForAverageAssetsCase(balanceSheet, appliedLoanValue)
        ) || defaultAssessmentValue;
    }

    private static _checkForAlwaysProfitCase(balanceSheet: accountProviderSheets) {
        let i = 0;
        for (i; i < rulesConfig.totalMonthCheck - 1; i++) {
            const {assetsValue: thisMonthAssetsValue} = balanceSheet[i];
            const {assetsValue: previousMonthAssetsValue} = balanceSheet[i + 1];
            if (thisMonthAssetsValue < previousMonthAssetsValue) break;
        }
        return i === rulesConfig.totalMonthCheck - 1 ? rulesConfig.profitCaseAssessmentPercentage : 0;
    }

    private static _checkForAverageAssetsCase(balanceSheet: accountProviderSheets, appliedLoanValue: number) {
        let average = 0;
        for (let i = 0; i < rulesConfig.totalMonthCheck; i++) {
            average += balanceSheet[i].assetsValue;
        }
        return average / rulesConfig.totalMonthCheck > appliedLoanValue ? rulesConfig.averageCaseAssessmentPercentage : 0;
    }
}
