import Taro from "@tarojs/taro";
import showToast from "@/common/toast";
import { getToken, toLogin } from "@/common";
import logger from "@/common/log";
import "./promise-extends";

class SXAjax {
  request = ({ url, params, method }) => {
    logger.log(url, params, method);
    return new Promise((resolve, reject) => {
      const httpUrl = `${process.env.BASE_URL}${url}`;
      const autoToken = getToken();
      const paramsData = {
        ...params,
      };
      Taro.request({
        url: httpUrl,
        timeout: 30000,
        data: paramsData,
        method: method,
        dataType: "json",
        header: {
          "content-type": "application/json",
          "user-token": autoToken,
        },
      })
        .then((response) => {
          const { statusCode = 0, data = {} } = response || {};
          if (statusCode === 200) {
            if (data?.code === 401) {
              showToast("登录失效，请重新登录");
              // 去登录
              toLogin();
            } else {
              resolve(data);
            }
          } else {
            if (statusCode === 401) {
              showToast("登录失效，请重新登录");
              // 去登录
              toLogin();
            } else {
              showToast("网络请求错误，请稍后重试");
            }
            reject(response);
          }
        })
        .catch((error) => {
          const { errMsg = "" } = error || {};
          if (errMsg.includes("timeout") || errMsg.includes("time out")) {
            showToast("网络请求超时，请检查您的网络连接状态。");
          } else {
            showToast("网络请求错误，请稍后重试");
          }
          logger.log(url, "网络请求错误", error);
          reject(error);
        });
    });
  };

  /**GET请求 */
  get = (url = "", params = {}) => {
    return this.request({ url: url, params, method: "GET" });
  };
  /**PUT请求 */
  put = (url = "", params = {}) => {
    return this.request({ url: url, params, method: "PUT" });
  };
  /**POST请求 */
  post = (url = "", params = {}) => {
    return this.request({ url: url, params, method: "POST" });
  };
  /**DELETE请求 */
  delete = (url = "", params = {}) => {
    return this.request({ url: url, params, method: "DELETE" });
  };
  /**图片上传 */
  upload = (url = "", params = {}) => {
    const { filePath = "" } = params;
    logger.log("upload parmas = ", params);
    /** 有文件传进来 */
    if (filePath) {
      return new Promise((resolve, reject) => {
        const httpUrl = `${process.env.BASE_URL}${url}`;
        const autoToken = getToken();
        Taro.uploadFile({
          url: httpUrl,
          filePath: filePath,
          timeout: 60000,
          name: "file",
          formData: {
            ...params,
          },
          header: {
            "content-type": "multipart/form-data",
            "user-token": autoToken,
          },
          success(response) {
            logger.log("upload success = ", response);
            const { statusCode = 0, data = {} } = response || {};
            if (statusCode === 200) {
              if (data?.code === 401) {
                showToast("登录失效，请重新登录");
                // 去登录
                toLogin();
              } else {
                resolve(data);
              }
            } else {
              if (statusCode === 401) {
                showToast("登录失效，请重新登录");
                // 去登录
                toLogin();
              } else {
                showToast("网络请求错误，请稍后重试");
              }
              reject(response);
            }
          },
          fail(error) {
            const { errMsg = "" } = error || {};
            if (errMsg.includes("timeout") || errMsg.includes("time out")) {
              showToast("网络请求超时，请检查您的网络连接状态。");
            } else {
              showToast("网络请求错误，请稍后重试");
            }
            logger.error(url, "网络请求错误", error);
            reject(error);
          },
        });
      });
    } else {
      return this.request({ url: url, params, method: "POST" });
    }
  };
}

const ajax = new SXAjax();

export default ajax;
