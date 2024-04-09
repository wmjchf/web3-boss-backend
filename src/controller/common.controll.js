const path = require("path");
const fs = require("fs");
const { fileUploadError, ossUploadError } = require("../constant/error.type");
const { OSS_EXPIRES } = require("../config/config.default");
const OSS = require("ali-oss");
const {
  OSS_ACCESS_KEY_ID,
  OSS_ACCESS_KEY_SECRET,
} = require("../config/config.default");

const client = new OSS({
  region: "oss-cn-hangzhou", // 示例：'oss-cn-hangzhou'，填写Bucket所在地域。
  accessKeyId: OSS_ACCESS_KEY_ID, // 确保已设置环境变量OSS_ACCESS_KEY_ID。
  accessKeySecret: OSS_ACCESS_KEY_SECRET, // 确保已设置环境变量OSS_ACCESS_KEY_SECRET。
  bucket: "flowin3", // 示例：'my-bucket-name'，填写存储空间名称。
});

class CommonControll {
  async upload(ctx, next) {
    const { file } = ctx.request.files;
    if (file) {
      const name = file.originalFilename;
      const path = file.filepath;
      try {
        const result = await client.put(name, path);
        ctx.body = {
          code: 0,
          message: "文件上传成功",
          result: {
            url: result.url,
          },
        };
      } catch (error) {
        ctx.app.emit("error", ossUploadError, ctx);
      }
    } else {
      ctx.app.emit("error", fileUploadError, ctx);
    }
  }

  async previewUrl(ctx, next) {
    try {
      const { path } = ctx.request.query;
      const url = client.signatureUrl(path, {
        // 设置过期时间，默认值为1800秒。
        expires: OSS_EXPIRES,
        // // 设置图片处理参数。
        // process: "image/resize,w_200",
      });

      ctx.body = url;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CommonControll();
