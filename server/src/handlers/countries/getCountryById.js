const axios = require("axios");
module.exports = async (id) => {
  const { data } = await axios.get("http://localhost:5000/countries");
  const country = data.find(
    (country) =>
      country.cca3 === id.toUpperCase() || country.cioc === id.toUpperCase()
  );
  return country;
};
