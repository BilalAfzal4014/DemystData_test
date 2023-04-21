import api from "./index";

const url = "/account-providers";
export const fetchAccountProviders = () => {
  return api("get", url);
}
