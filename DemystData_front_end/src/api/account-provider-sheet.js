import api from "./index";

const url = "/balance-sheets";
export const fetchBalanceSheetByProviderName = (providerName) => {
  return api("get", `${url}/${providerName}`);
}
