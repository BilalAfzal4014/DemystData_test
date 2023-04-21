import axios from "axios";
import * as toastr from "toastr";

const baseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost:4000/v1'


const getParams = (...params) => {
  return params.filter((param) => {
    return !!param;
  });
}

const api = (type, url, data = null) => {
  const params = getParams(baseUrl + url, data);
  return axios[type](...params).then((response) => {
    if (type !== 'get') toastr.success(response.data.message);
    return response.data.data
  }).catch((error) => {
    handleApiErrors(error.response.data);
    throw error;
  });
}

const handleApiErrors = (error) => {
  handleGeneralError(error);
  handlePayloadValidationErrors(error);
}

const handleGeneralError = (error) => {
  if (error.message) {
    toastr.error(error.message);
  }
}

const handlePayloadValidationErrors = (error) => {
  if (error.errors) {
    const payLoadValidationErrors = error.errors;
    for (const key in payLoadValidationErrors) {
      const errorMessage = payLoadValidationErrors[key][0];
      toastr.error(errorMessage);
    }
  }
}

export default api;
