import { createContext, useContext, useReducer } from "react";
import { getLocalState, setLocalState } from "./helper";

// 创建全局上下文对象
export const AppContext = createContext(null);

// 创建全局reducer函数
function reducer(state, action) {
  const { type, payload = {} } = action;

  let store = {};
  if (type === "userLogout") {
    // 退出登录
    store = {};
  } else if (type === "setUserInfo") {
    // 更新用户信息
    store = { ...state, userInfo: payload };
  } else if (type === "setAuthInfo") {
    // 更新认证信息
    store = { ...state, authInfo: payload };
  } else {
    throw new Error(`Unhandled action type: ${action.type}`);
  }
  setLocalState(store);
  return store;
}

// 创建全局状态提供器组件
export function AppProvider({ children }) {
  const store = getLocalState();
  const [state, dispatch] = useReducer(reducer, {
    ...store,
  });
  // 设置用户信息
  const setUserInfo = (userInfo = {}) => {
    dispatch({ type: "setUserInfo", payload: userInfo });
  };
  // 设置认证信息
  const setAuthInfo = (authInfo = {}) => {
    dispatch({ type: "setAuthInfo", payload: authInfo });
  };
  const userLogout = () => {
    dispatch({ type: "userLogout" });
  };
  // 将state和dispatch作为value传递给子组件
  return (
    <AppContext.Provider
      value={{ state, dispatch, setUserInfo, setAuthInfo, userLogout }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function useAppContext() {
  return useContext(AppContext);
}
