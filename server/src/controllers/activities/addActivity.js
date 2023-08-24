const addActivityHandler = require("../../handlers/activities/addActivity");
const translation = require("../../translations/en.json");

const addActivity = async (req, res) => {
  const { name, difficulty, season } = req.body;
  const { id } = req.query;
  try {
    if (!name || !difficulty || !season)
      throw new Error(translation.addActivity.missingData);
    const newActivity = await addActivityHandler(
      { name, difficulty, season },
      id
    );
    res.status(201).json(newActivity);
  } catch (error) {
    res
      .status(500)
      .json({ error: `${translation.addActivity.error}: ${error.message}` });
  }
};

module.exports = addActivity;
