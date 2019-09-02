module.exports = {
  env: {
    cmd: true,
    browser: true,
    es6: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    //全局变量
    __DEV__: true,
    __WECHAT__: true,
    __ALIPAY__: true,
    App: true,
    Page: true,
    Component: true,
    Behavior: true,
    wx: true,
    getApp: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {}
};
