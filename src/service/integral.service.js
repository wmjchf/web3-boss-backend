const Integral = require("../model/integral.model");
const Job = require("../model/job.model");
const User = require("../model/user.model");

class IntegralService {
  async create({ userId, fromId, jobId, count, tool, type, resumeId }) {
    try {
      const result = await Integral.create({
        userId,
        fromId,
        jobId,
        count,
        tool,
        type,
        resumeId,
      });
      return result.dataValues;
    } catch (error) {
      console.log(error, "fds");
    }
  }

  async findAll({ pageNum, pageSize, userId, jobId, fromId, type, tool }) {
    const whereOpt = {};

    tool && Object.assign(whereOpt, { tool });
    userId && Object.assign(whereOpt, { userId });
    jobId && Object.assign(whereOpt, { jobId });
    fromId && Object.assign(whereOpt, { fromId });
    type && Object.assign(whereOpt, { type });

    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Job.findAndCountAll({
      offset,
      limit: pageSize * 1,
      order: [["updatedAt", "DESC"]],
      include: [
        {
          model: User,
        },
        {
          model: Job,
        },
      ],
      attributes: ["id", "type", "tool", "count"],
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

module.exports = new IntegralService();
