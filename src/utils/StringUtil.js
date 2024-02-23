/**
 * 格式化数字
 * @param {*} value
 * @returns
 */
export const toFixedString = (value) => {
  if (!value) {
    return "0.00";
    // eslint-disable-next-line no-restricted-globals
  } else if (isNaN(value)) {
    return "0.00";
  }
  let numberValue = Number(value);
  if (typeof value === "string") {
    numberValue = Number(value);
  }
  return `${numberValue.toFixed(2)}`;
};

/**
 * 生成 32 位唯一键
 * @returns
 */
export const uuid = () => {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * 把对象转为get参数
 * @param {*} params
 * @returns
 */
export const objectToParams = (params) => {
  return Object.entries(params)
    .reduce((pre, cur) => {
      pre.push(cur.join("="));
      return pre;
    }, [])
    .join("&");
};
