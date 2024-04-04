const Company = require("../model/company.model");
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
    isFace,
    location,
  }) {
    try {
      const result = await Job.create({
        name,
        isRemote,
        description,
        companyId,
        minSalary,
        maxSalary,
        isFace,
        location,
        tag,
      });
      return result.dataValues;
    } catch (error) {
      console.log(error, "fds");
    }
  }

  async getJobList({
    name,
    isRemote,
    companyId,
    pageNum,
    pageSize,
    isDelete = false,
    location,
  }) {
    const whereOpt = {};

    isRemote && Object.assign(whereOpt, { isRemote });
    name && Object.assign(whereOpt, { name });
    companyId && Object.assign(whereOpt, { companyId });
    location && Object.assign(whereOpt, { location });
    Object.assign(whereOpt, { isDelete });
    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Job.findAndCountAll({
      offset,
      limit: pageSize * 1,
      include: [
        {
          model: Company,
        },
      ],
      attributes: [
        "name",
        "id",
        "isRemote",
        "maxSalary",
        "minSalary",
        "isFace",
        "location",
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
      include: [
        {
          model: Company,
        },
      ],
      attributes: [
        "name",
        "id",
        "isRemote",
        "maxSalary",
        "minSalary",
        "tag",
        "description",
        "isFace",
        "location",
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
