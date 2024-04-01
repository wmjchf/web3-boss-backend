const CPicture = require("../model/cpicture.model");
class CPictureService {
  async createPicture({ url, companyId }) {
    const result = await CPicture.create({
      url,
      companyId,
    });
    return result.dataValues;
  }
  async createPictures(data) {
    const result = await CPicture.bulkCreate(data);
    return result.map((item) => {
      return item.dataValues;
    });
  }
  async getPictureList({ companyId, pageNum, pageSize }) {
    const whereOpt = {};

    companyId && Object.assign(whereOpt, { companyId });

    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await CPicture.findAndCountAll({
      offset,
      limit: pageSize * 1,
      attributes: ["url", "id"],
      where: whereOpt,
    });

    return {
      total: count,
      pageNum,
      pageSize,
      list: rows,
    };
  }
}

module.exports = new CPictureService();
