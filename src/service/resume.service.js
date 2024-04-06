const Resume = require("../model/resume.model");
class CResumeService {
  async createResume({ url, userId, name }) {
    const result = await Resume.create({
      url,
      userId,
      name,
    });
    return result.dataValues;
  }

  async getResumeList({ userId, pageNum, pageSize }) {
    const whereOpt = {};

    userId && Object.assign(whereOpt, { userId });

    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Resume.findAndCountAll({
      offset,
      limit: pageSize * 1,
      attributes: ["url", "userId", "name", "id"],
      where: whereOpt,
    });

    return {
      total: count,
      pageNum,
      pageSize,
      list: rows,
    };
  }

  async updateResumeById(id, data) {
    const result = await Resume.update(data, {
      where: { id },
    });
    return result[0] > 0 ? true : false;
  }
}

module.exports = new CResumeService();
