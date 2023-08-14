const { Activity } = require("../../db");
module.exports = async () => {
  const activities = await Activity.findAll();
  return activities;
};
