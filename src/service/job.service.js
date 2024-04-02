const Job = require("../model/job.model");
class JobService {
  async createJob({
    name,
    isRemote,
    description,
    companyId,
    tag,
    minSalary,
    maxSalary,
  }) {
    const result = await Job.create({
      name,
      isRemote,
      description,
      companyId,
      minSalary,
      maxSalary,
      tag,
    });
    return result.dataValues;
  }

  async getJobList({ name, isRemote, companyId, pageNum, pageSize }) {
    const whereOpt = {};

    isRemote && Object.assign(whereOpt, { isRemote });
    name && Object.assign(whereOpt, { name });
    companyId && Object.assign(whereOpt, { companyId });
    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Job.findAndCountAll({
      offset,
      limit: pageSize * 1,
      attributes: [
        "name",
        "id",
        "isRemote",
        "companyId",
        "maxSalary",
        "minSalary",
        "tag",
        "description",
        "updatedAt",
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
  async getJobInfo(id) {
    const result = await Job.findOne({
      attributes: [
        "name",
        "id",
        "isRemote",
        "companyId",
        "maxSalary",
        "minSalary",
        "tag",
        "description",
      ],
      where: {
        id,
      },
    });
    return result ? result.dataValues : null;
  }
  async updateJobById(id, data) {
    const result = await Job.update(data, {
      where: { id },
    });
    return result[0] > 0 ? true : false;
  }
}

module.exports = new JobService();
