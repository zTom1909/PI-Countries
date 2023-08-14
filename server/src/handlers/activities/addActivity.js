const { Activity } = require("../../db");
module.exports = async (activity) => {
  const newActivity = Activity.create(activity);
  return newActivity;
};
