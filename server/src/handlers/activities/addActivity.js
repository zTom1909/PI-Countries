const { User, Activity, Country } = require("../../db");

module.exports = async (activity, id, email) => {
  const idsToUpperCase = id.split(",").map((country) => country.toUpperCase())
  const user = await User.findOne({ where: { email } });
  const newActivity = await Activity.create(activity);
  await newActivity.addCountries(idsToUpperCase);
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
