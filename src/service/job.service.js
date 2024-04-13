const Company = require("../model/company.model");
const Job = require("../model/job.model");

const seq = require("sequelize");
const User = require("../model/user.model");
const Op = seq.Op;

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
    contact,
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
        contact,
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

    isRemote && Object.assign(whereOpt, { isRemote: 1 });
    name && Object.assign(whereOpt, { name: { [Op.like]: `%${name}%` } });
    companyId && Object.assign(whereOpt, { companyId });
    location &&
      Object.assign(whereOpt, { location: { [Op.like]: `%${location}%` } });
    Object.assign(whereOpt, { isDelete });
    const offset = (pageNum - 1) * pageSize;

    const { count, rows } = await Job.findAndCountAll({
      offset,
      limit: pageSize * 1,
      order: [["updatedAt", "DESC"]],
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
          include: [
            {
              model: User,
            },
          ],
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
