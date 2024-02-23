import Taro from "@tarojs/taro";
// 存储365天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 365;

export function set(key, data) {
  if (key && data) {
    const storageData = {
      data,
      expire: new Date().getTime() + DEFAULT_CACHE_TIME * 1000,
    };
    const json = JSON.stringify(storageData);
    Taro.setStorage({
      key: key,
      data: json,
    });
  } else {
    console.error(`key is ${key}, data is ${data}`);
  }
}

export function get(key) {
  if (key) {
    try {
      const json = Taro.getStorageSync(key);
      if (json) {
        const storageData = JSON.parse(json);
        if (storageData) {
          const { data, expire } = storageData;
          if (expire === null || expire >= Date.now()) {
            return data;
          }
        }
      }
    } catch (e) {
      console.error("getStorageSync = ", e);
    }
    Taro.removeStorage({
      key: key,
      success: function (res) {
        console.error("removeStorage = ", res);
      },
    });
    return null;
  } else {
    console.error(`get key is ${key}`);
  }
}
