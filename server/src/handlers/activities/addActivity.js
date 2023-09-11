const { User, Activity, Country } = require("../../db");

module.exports = async (activity, id, email) => {
  const user = await User.findOne({ where: { email } });
  const newActivity = await Activity.create(activity);
  await newActivity.addCountries([id.toUpperCase()]);
  await user.addActivities([newActivity.id])

  return await Activity.findOne({
    where: { id: newActivity.id },
    include: [
      {
        model: Country,
        attributes: [
          "id",
          "name",
          "image",
          "region",
          "subregion",
          "capitalCity",
          "area",
          "population",
        ],
        through: {
          attributes: [],
        },
      },
    ],
  });
};
