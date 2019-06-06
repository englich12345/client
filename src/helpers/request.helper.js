import axios from "axios";
import qs from "qs";
import AppConfig from "../config";

const instance = axios.create({
  timeout: 10000
});

const handleError = error => {
  //eslint-disable-next-line
  console.log("error", error);
  if (error.response) {
    const message =
      error.response && error.response.data && error.response.data.message;
    if (message) {
      // eslint-disable-next-line
      console.log("message", message);
    }
  } else if (error.request) {
    //eslint-disable-next-line
    console.log("error.request", "Network error!");
  } else {
    //eslint-disable-next-line
    console.log("An unknown error has occurred!");
  }
};

const baseUrl = AppConfig.baseUrlDev;

export default class RequestHelper {
  static async getHeader() {
    return {
      accept: "application/json",
      contentType: "application/json"
    };
  }
  static async get(apiUrl, params) {
    const header = await this.getHeader();
    return instance
      .get(baseUrl + apiUrl, {
        headers: header,
        params,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        }
      })
      .then((data) => {
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }
  static async post(apiUrl, data) {
    return instance({
      method: "post",
      url: baseUrl + apiUrl,
      headers: await this.getHeader(),
      data: data
    })
      .then(data => {
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }
  static async put(apiUrl, data) {
    return instance({
      method: "put",
      url: baseUrl + apiUrl,
      headers: await this.getHeader(),
      data: data
    })
      .then(data => {
        return data.data;
      })
      .catch(e => {
        handleError(e);
        throw e;
      });
  }
}
