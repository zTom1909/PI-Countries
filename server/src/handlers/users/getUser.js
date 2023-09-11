const { User, Activity } = require("../../db");

module.exports = async (email) => {
  const user = User.findOne({
    where: { email },
    include: {
      model: Activity,
      attributes: ["id", "name", "difficulty", "duration", "season"],
      through: {
        attributes: [],
      },
    },
  });
  return user;
};
