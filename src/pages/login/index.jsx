import { useCallback, useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import {
  Button as NutButton,
  Input as NutInput,
} from "@nutui/nutui-react-taro";
import { WaterMark } from "@/components";
import { isPhoneNumber, isSixNumber } from "@/utils";
import useAppContext from "@/store";
import showToast from "@/common/toast";
import { getToken } from "@/common";
import logger from "@/common/log";
import ajax from "@/common/ajax";
import "./index.less";

/**
 * 登录
 * @returns
 */
const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState("18168896116");
  const [code, setCode] = useState("123456");
  const [timeLeft, setTimeLeft] = useState(90);
  const [isCounting, setIsCounting] = useState(false);
  const [isLogining, setIsLogining] = useState(true);

  const { state, setAuthInfo } = useAppContext();
  logger.log("state ===", state);
  logger.log("getToken ===", getToken());

  Taro.setNavigationBarTitle({ title: "" }); // 隐藏导航栏

  useEffect(() => {
    Taro.showLoading({
      title: "登录中...",
    });
    // 获取登录状态
    const authToken = getToken();
    // 如果已经登录，则不需要再次登录，直接进入主页面
    if (authToken) {
      Taro.switchTab({ url: "/pages/home/index" });
      Taro.hideLoading();
    } else {
      // 微信登录
      Taro.getNetworkType({
        success: (networkResponse) => {
          const { networkType = "" } = networkResponse || {};
          logger.log("客户网络状态 = ", JSON.stringify(networkResponse));
          if (networkType === "none" || networkType === "unknown") {
            showToast("请检查您的网络连接状态");
            Taro.hideLoading();
          } else {
            Taro.login({
              success: (res) => {
                const { code: wxCode = "" } = res || {};
                logger.log("微信登录 wxCode = ", wxCode);
                if (wxCode) {
                  const accountInfo = Taro.getAccountInfoSync();
                  const { miniProgram = {} } = accountInfo || {};
                  const { appId = "" } = miniProgram;
                  //发起网络请求
                  const url = `/wx/user/${appId}/login?code=${wxCode}`;
                  const params = {};
                  ajax
                    .get(url, params)
                    .then((response) => {
                      const { code: codeStatus = 0, data = {}, msg } = response;
                      if (codeStatus === 200) {
                        const { token = "", openid = "" } = data || {};
                        // 这里可以存储接口返回的凭证信息
                        logger.log("token ===", token);
                        logger.log("openid ===", openid);
                      } else {
                        showToast(msg || "哎呀，出错了，请稍后再试");
                      }
                    })
                    .catch((error) => {
                      logger.error("error=", error);
                    })
                    .finally(() => {});
                }
              },
              fail: () => {
                showToast("当前网络异常，请检查您的网络");
              },
              complete: () => {
                Taro.hideLoading();
              },
            });
          }
        },
        fail: (err) => {
          logger.error("network err=", err);
          showToast("当前网络异常，请检查您的网络");
        },
        complete: () => {
          Taro.hideLoading();
        },
      });
    }
    setTimeout(() => {
      setIsLogining(false);
    }, 1000);

    // wxLogin()
    //   .then((res) => {
    //     Taro.hideLoading();
    //     logger.info("wxLogin res ==", res);
    //   })
    //   .catch((error) => {
    //     Taro.hideLoading();
    //     logger.error("wxLogin error =", error);
    //   });
  }, []);

  /**
   * 倒计时
   */
  useEffect(() => {
    let timer;
    if (isCounting && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      setIsCounting(false);
      setTimeLeft(60);
    }
    return () => clearTimeout(timer);
  }, [isCounting, timeLeft]);

  // 输入手机号
  const onPhoneChange = useCallback((value) => {
    setAccount(value);
  }, []);

  // 输入验证码
  const onCodeChange = useCallback((value) => {
    setCode(value);
  }, []);
  // 检查手机号
  const testPhoneNumber = useCallback(() => {
    if (isPhoneNumber(account)) {
      return true;
    } else {
      if (account) {
        showToast("请输入正确手机号");
      } else {
        showToast("请输入手机号码");
      }
    }
    return false;
  }, [account]);
  // 检查验证码
  const testAuthCode = useCallback(() => {
    if (isSixNumber(code)) {
      return true;
    } else {
      if (code) {
        showToast("请输入正确验证码");
      } else {
        showToast("请输入验证码");
      }
    }
    return false;
  }, [code]);
  /**
   * 获取验证码
   */
  const onAuthCodeAction = useCallback(() => {
    if (testPhoneNumber()) {
      //发起网络请求
      const url = "/H5/regist/sendPhoneCode";
      const params = {
        messageType: "6",
        phone: account,
      };
      ajax
        .get(url, params)
        .then((response) => {
          const { code: codeStatus = 0, msg } = response;
          if (codeStatus === 200) {
            setIsCounting(true);
            showToast("验证码发送成功");
          } else {
            showToast(msg || "哎呀，出错了，请稍后再试");
          }
        })
        .catch((error) => {
          logger.error("error =", error);
        })
        .finally(() => {
          logger.log("finally");
        });
    }
  }, [testPhoneNumber, account]);

  const onSubmitAction = useCallback(() => {
    // for 测试 start 使用的时候删除
    setAuthInfo({ token: "我是个token" });
    Taro.switchTab({ url: "/pages/home/index" });
    return;
    // for 测试 end
    if (testPhoneNumber() && testAuthCode()) {
      setIsLoading(true);
      //发起网络请求
      const url = "/H5/Login/loginByPhoneCodeH5";
      const params = {
        phoneCode: code,
        phoneNumber: account,
      };
      ajax
        .post(url, params)
        .then((response) => {
          const { code: codeStatus = 0, msg, data: userToken = "" } = response;
          if (codeStatus === 200) {
            // 登录成功，设置登录token
            setAuthInfo({ token: userToken });
            setTimeout(() => {
              // 跳转到主页面
              Taro.switchTab({ url: "/pages/home/index" });
            }, 1000);
          }
          showToast(msg || "哎呀，出错了，请稍后再试");
        })
        .catch((error) => {
          // 登录失败，清除登录状态
          setAuthInfo({});
          logger.error("error =", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [setAuthInfo, testPhoneNumber, testAuthCode, code, account]);

  return (
    <View className="container">
      <WaterMark zIndex={-1} />
      {!isLogining ? (
        <View className="login-view">
          <View className="title-view">
            <Text className="title">欢迎登录小程序</Text>
          </View>
          <View className="login-view">
            <NutInput
              defaultValue={account}
              style={{
                "--nutui-input-border-bottom-width": "1px",
                "--nutui-input-padding": "10px 0px",
              }}
              placeholder="请输入手机号码"
              onChange={onPhoneChange}
              onBlur={testPhoneNumber}
            />
            <View className="code-view">
              <NutInput
                defaultValue={code}
                style={{
                  "--nutui-input-border-bottom-width": "1px",
                  "--nutui-input-padding": "10px 0px",
                }}
                placeholder="请输入6位验证码"
                onChange={onCodeChange}
                onBlur={testAuthCode}
              />
              <NutButton
                disabled={isCounting}
                type="primary"
                size="small"
                onClick={onAuthCodeAction}
              >
                {isCounting ? `${timeLeft}秒后重新获取` : "发送验证码"}
              </NutButton>
            </View>
            <NutButton
              style={{
                backgroundColor: "blue",
              }}
              loading={isLoading}
              type="primary"
              onClick={onSubmitAction}
            >
              登录
            </NutButton>

            <Text className="login-tip">小程序项目模板</Text>
          </View>
        </View>
      ) : (
        <View className="loading-view">
          <Text>处理中...</Text>
        </View>
      )}
    </View>
  );
};

export default Index;
