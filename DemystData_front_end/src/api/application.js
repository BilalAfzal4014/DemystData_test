import api from "./index";

const url = "/applications";

export const createApplication = (data) => {
  return api("post", url, data);
}

