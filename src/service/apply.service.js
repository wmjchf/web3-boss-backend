const Apply = require("../model/apply.model");
const Company = require("../model/company.model");
const Job = require("../model/job.model");
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

  async getApplyList({ jobId, pageNum, pageSize, haveRead, mark, isDownload }) {
    const whereOpt = {};

    jobId && Object.assign(whereOpt, { jobId });
    haveRead && Object.assign(whereOpt, { haveRead });
    isDownload && Object.assign(whereOpt, { isDownload });
    mark && Object.assign(whereOpt, { mark });

    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Apply.findAndCountAll({
      offset,
      limit: pageSize * 1,
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: Resume,
        },
      ],
      attributes: [
        "jobId",
        "userId",
        "haveRead",
        "mark",
        "updatedAt",
        "id",
        "isDownload",
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

  async getApplyByUserId({ userId, pageNum, pageSize, jobId }) {
    try {
      const whereOpt = {};
      userId && Object.assign(whereOpt, { userId });
      jobId && Object.assign(whereOpt, { jobId });
      const offset = (pageNum - 1) * pageSize;
      const { count, rows } = await Apply.findAndCountAll({
        include: [
          {
            model: Resume,
          },
          {
            model: Job,
            include: [
              {
                model: Company,
              },
            ],
          },
        ],
        offset,
        limit: pageSize * 1,
        attributes: [
          "jobId",
          "userId",
          "haveRead",
          "mark",
          "updatedAt",
          "id",
          "isDownload",
        ],
        where: whereOpt,
      });

      return {
        total: count,
        pageNum,
        pageSize,
        list: rows,
      };
    } catch (error) {
      console.log(error, "vvvvvv");
    }
  }

  async updateApplyById(id, data) {
    const result = await Apply.update(data, {
      where: { id },
    });
    return result[0] > 0 ? true : false;
  }
}

module.exports = new CApplyService();
