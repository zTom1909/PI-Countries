const { User } = require("../../db");

module.exports = async (user) => {
  const oldUser = await User.findOne({ where: { email: user.email } });
  if (oldUser) throw new Error("That user already exists!")
  const newUser = await User.create(user);
  return newUser.dataValues;
};
