const Apply = require("../model/apply.model");
class CApplyService {
  async createApply({ jobId, resumeId, uid, resumeUrl, resumeName, haveRead }) {
    const result = await Apply.create({
      jobId,
      resumeId,
      uid,
      resumeUrl,
      resumeName,
      haveRead,
    });
    return result.dataValues;
  }

  async getApplyList({ jobId, pageNum, pageSize }) {
    const whereOpt = {};

    jobId && Object.assign(whereOpt, { jobId });

    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Apply.findAndCountAll({
      offset,
      limit: pageSize * 1,
      attributes: [
        "resumeUrl",
        "jobId",
        "resumeName",
        "uid",
        "resumeId",
        "haveRead",
      ],
      where: whereOpt,
    });

    return {
      total: count,
      pageNum,
      pageSize,
      list: rows,
    };
  }

  async getApplyByUid(uid) {
    try {
      const result = await Apply.findOne({
        attributes: [
          "resumeUrl",
          "jobId",
          "resumeName",
          "uid",
          "resumeId",
          "haveRead",
        ],
        where: { uid },
      });
      return result ? result.dataValues : null;
    } catch (error) {}
  }
}

module.exports = new CApplyService();
