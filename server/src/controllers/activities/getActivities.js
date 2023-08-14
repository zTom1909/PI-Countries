const getActivitiesHandler = require("../../handlers/activities/getActivities");
const translation = require("../../translations/en.json");

const getActivities = async (req, res) => {
  try {
    const activities = await getActivitiesHandler();
    res.status(200).json(activities);
  } catch (error) {
    res
      .status(500)
      .json({ error: `${translation.getActivities.error}: ${error.message}` });
  }
};

module.exports = getActivities;
