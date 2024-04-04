const Apply = require("../model/apply.model");
const Resume = require("../model/resume.model");

class CApplyService {
  async createApply({ jobId, resumeId, userId }) {
    const result = await Apply.create({
      jobId,
      resumeId,
      userId,
    });

    return result.dataValues;
  }

  async getApplyList({ jobId, pageNum, pageSize, haveRead, mark }) {
    const whereOpt = {};

    jobId && Object.assign(whereOpt, { jobId });
    haveRead && Object.assign(whereOpt, { haveRead });
    mark && Object.assign(whereOpt, { mark });

    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Apply.findAndCountAll({
      offset,
      limit: pageSize * 1,
      include: [
        {
          model: Resume,
        },
      ],
      attributes: ["jobId", "userId", "haveRead", "mark", "updatedAt", "id"],
      where: whereOpt,
    });

    return {
      total: count,
      pageNum,
      pageSize,
      list: rows,
    };
  }

  async getApplyByUserId(jobId, userId) {
    try {
      const whereOpt = {};
      userId && Object.assign(whereOpt, { userId });
      jobId && Object.assign(whereOpt, { jobId });
      const result = await Apply.findOne({
        include: [
          {
            model: Resume,
          },
        ],
        attributes: ["jobId", "userId", "haveRead", "mark", "updatedAt", "id"],
        where: whereOpt,
      });
      return result ? result.dataValues : null;
    } catch (error) {}
  }

  async updateApplyById(id, data) {
    const result = await Apply.update(data, {
      where: { id },
    });
    return result[0] > 0 ? true : false;
  }
}

module.exports = new CApplyService();
