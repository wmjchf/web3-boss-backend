module.exports = {
  userFormateError: {
    code: "10001",
    message: "message或者signature不能为空",
    result: "",
  },
  userLoginError: {
    code: "10003",
    message: "用户登录错误",
    result: "",
  },
  userNonceError: {
    code: "10004",
    message: "用户获取nonce错误",
    message: "",
  },
  userVerifyError: {
    code: "10005",
    message: "用户siwe校验失败",
    result: "",
  },
  tokenExpiredError: {
    code: "10101",
    message: "token过期",
    result: "",
  },
  invalidToken: {
    code: "10102",
    message: "需要重新登录",
    result: "",
  },
  fileUploadError: {
    code: "00001",
    message: "文件上传错误",
    result: "",
  },
  unSupportFileType: {
    code: "00002",
    message: "不支持文件的格式",
    result: "",
  },
  ossUploadError: {
    code: "00003",
    message: "oss上传错误",
    result: "",
  },
};
