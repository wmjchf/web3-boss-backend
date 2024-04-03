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

  async getApplyList({ jobId, pageNum, pageSize, haveRead, mark }) {
    const whereOpt = {};

    jobId && Object.assign(whereOpt, { jobId });
    haveRead && Object.assign(whereOpt, { haveRead });
    mark && Object.assign(whereOpt, { mark });

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
        "mark",
        "updatedAt",
        "id",
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

  async updateApplyById(id, data) {
    const result = await Apply.update(data, {
      where: { id },
    });
    return result[0] > 0 ? true : false;
  }
}

module.exports = new CApplyService();
