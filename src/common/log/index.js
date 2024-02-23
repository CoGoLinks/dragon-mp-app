import Taro from "@tarojs/taro";

class Logger {
  logManager = Taro.getLogManager({ level: 0 });

  log(...args) {
    if (process.env.NODE_ENV === "development") {
      console.log(...args);
    } else {
      this.logManager.log(...args);
    }
  }

  _error(...args) {
    if (process.env.NODE_ENV === "development") {
      console.error(...args);
    } else {
      this.logManager.warn(...args);
    }
  }

  _warn(...args) {
    if (process.env.NODE_ENV === "development") {
      console.warn(...args);
    } else {
      this.logManager.warn(...args);
    }
  }
  error(...args) {
    this._error(...args);
  }
  err(...args) {
    this._error(...args);
  }
  warning(...args) {
    this._warn(...args);
  }
  warn(...args) {
    this._warn(...args);
  }

  info(...args) {
    this.log(...args);
  }
  debug(...args) {
    this.log(...args);
  }
}

const logger = new Logger();

export default logger;
