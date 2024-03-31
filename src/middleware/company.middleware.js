const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: {
        type: "string",
        require: true,
      },
    });
  } catch (error) {}
};

module.exports = {
  validator,
};
