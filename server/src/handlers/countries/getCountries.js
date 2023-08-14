const axios = require("axios");
module.exports = async (name) => {
  const { data } = await axios.get("http://localhost:5000/countries");
  const filteredCountries = data.filter((country) => {
    const countryName = country.name;
    let foundCountry = false;

    if (countryName.common.toLowerCase().includes(name?.toLowerCase()))
      foundCountry = true;
    if (countryName.official.toLowerCase().includes(name?.toLowerCase()))
      foundCountry = true;

    countryName.nativeName &&
      Object.keys(countryName.nativeName).forEach((lang) => {
        if (
          countryName.nativeName[lang].common
            ?.toLowerCase()
            .includes(name?.toLowerCase())
        )
          foundCountry = true;
        if (
          countryName.nativeName[lang].official
            ?.toLowerCase()
            .includes(name?.toLowerCase())
        )
          foundCountry = true;
      });

    return foundCountry;
  });
  const countries = name ? filteredCountries : data;
  return countries;
};
