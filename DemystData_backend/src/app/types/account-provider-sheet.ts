export type accountProviderSheet = {
    year: number,
    month: number,
    profitOrLoss: number,
    assetsValue: number
}

export type accountProviderSheets = Array<accountProviderSheet>;
export type allAccountProviders = 'Xero' | 'Myob';
