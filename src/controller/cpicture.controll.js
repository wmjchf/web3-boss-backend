const {
  getPictureList,
  createPicture,
  createPictures,
} = require("../service/cpicture.service");
class CPictureController {
  async get(ctx, next) {
    const { companyId, pageNum = 1, pageSize = 10 } = ctx.request.query;
    try {
      const result = await getPictureList({
        companyId,
        pageNum,
        pageSize,
      });
      ctx.body = {
        status: 0,
        message: "获取成功",
        result,
      };
    } catch (error) {
      console.log(error, "fs");
    }
  }

  async add(ctx, next) {
    const { url, companyId } = ctx.request.body;
    try {
      const res = await createPicture({
        url,
        companyId,
      });
      ctx.body = {
        status: 0,
        message: "添加图片成功",
        result: {
          id: res.id,
          url: res.url,
        },
      };
    } catch (error) {}
  }
  async adds(ctx, next) {
    const { pictures } = ctx.request.body;
    const { companyId } = ctx.request.params;
    try {
      const result = await createPictures(companyId, pictures);

      ctx.body = {
        status: 0,
        message: "添加图片成功",
        result,
      };
    } catch (error) {}
  }
}

module.exports = new CPictureController();
