const Resume = require("../model/resume.model");
class CResumeService {
  async createResume({ url, uid, name }) {
    const result = await Resume.create({
      url,
      uid,
      name,
    });
    return result.dataValues;
  }

  async getResumeList({ uid, pageNum, pageSize }) {
    const whereOpt = {};

    uid && Object.assign(whereOpt, { uid });

    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Resume.findAndCountAll({
      offset,
      limit: pageSize * 1,
      attributes: ["url", "uid", "name", "id"],
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

module.exports = new CResumeService();
