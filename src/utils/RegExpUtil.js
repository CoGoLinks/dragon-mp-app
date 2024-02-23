/**
 * 是否为电话号码 1开头11位
 */
export const isPhoneNumber = (value = "") => {
  const regExp = new RegExp(/^1\d{10}$/, "g");
  return regExp.test(value);
};

/**
 * 6位验证码
 */
export const isSixNumber = (value = "") => {
  const regExp = new RegExp(/^\d{6}$/, "g");
  return regExp.test(value);
};
