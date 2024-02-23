import pkg from "package";
import * as ss from "./storage";

const LOCAL_NAME = pkg.name;

export function defaultState() {
  return {
    userInfo: {}, // 用户信息
    authInfo: {}, // 认证信息
  };
}

export function getLocalState() {
  const localState = ss.get(LOCAL_NAME);
  return { ...defaultState(), ...localState };
}

export function setLocalState(state) {
  ss.set(LOCAL_NAME, state);
}
