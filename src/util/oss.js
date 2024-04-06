const OSS = require("ali-oss");
const {
  OSS_ACCESS_KEY_ID,
  OSS_ACCESS_KEY_SECRET,
} = require("../config/config.default");

const client = new OSS({
  region: "oss-cn-hangzhou", // 示例：'oss-cn-hangzhou'，填写Bucket所在地域。
  accessKeyId: OSS_ACCESS_KEY_ID, // 确保已设置环境变量OSS_ACCESS_KEY_ID。
  accessKeySecret: OSS_ACCESS_KEY_SECRET, // 确保已设置环境变量OSS_ACCESS_KEY_SECRET。
  bucket: "web3-boss-image", // 示例：'my-bucket-name'，填写存储空间名称。
});

export const previewUrl = async (path) => {
  const { path } = ctx.request.query;
  const url = await client.signatureUrl(path);
  return url;
};
