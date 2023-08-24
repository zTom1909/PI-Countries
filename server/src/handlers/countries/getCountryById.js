const { Country, Activity } = require("../../db");

module.exports = async (id) => {
  return await Country.findOne({
    where: { id: id.toUpperCase() },
    include: [
      {
        model: Activity,
        attributes: ["id", "name", "difficulty", "season"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};
