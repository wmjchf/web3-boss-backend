const {
  getJobList,
  createJob,
  getJobInfo,
  updateJobById,
} = require("../service/job.service");

class JobController {
  async get(ctx, next) {
    const {
      name,
      isRemote,
      companyId,
      pageNum = 1,
      pageSize = 10,
    } = ctx.request.query;

    try {
      const result = await getJobList({
        isRemote,
        companyId,
        name,
        pageNum,
        pageSize,
      });

      ctx.body = {
        status: 0,
        message: "获取成功",
        result,
      };
    } catch (error) {}
  }

  async add(ctx, next) {
    const {
      name,
      isRemote,
      description,
      companyId,
      tag,
      minSalary,
      maxSalary,
    } = ctx.request.body;
    try {
      const res = await createJob({
        name,
        isRemote,
        description,
        companyId,
        tag,
        minSalary,
        maxSalary,
      });
      ctx.body = {
        status: 0,
        message: "添加项目/团队/公司成功",
        result: {
          id: res.id,
          name: res.name,
          logo: res.logo,
          location: res.location,
          description: res.description,
          address: res.address,
        },
      };
    } catch (error) {}
  }

  async getById(ctx, next) {
    const { id } = ctx.request.params;
    try {
      const result = await getJobInfo(id);
      ctx.body = {
        status: 0,
        message: "获取成功",
        result,
      };
    } catch (error) {}
  }

  async update(ctx, next) {
    const { id } = ctx.request.params;
    try {
      const result = await updateJobById(id, ctx.request.body);
      ctx.body = {
        status: 0,
        message: "修改成功",
        result,
      };
    } catch (error) {}
  }
}

module.exports = new JobController();
