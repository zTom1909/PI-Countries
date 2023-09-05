const { Country } = require("../db");
const { countries } = require("../../api/db.json");
module.exports = async () => {
  countries.forEach(async (country) => {
    const id = country.cioc ? country.cioc : country.cca3;
    const name = country.name.common || country.name.official;
    const image = country.flags.png;
    const region = country.region;
    const subregion = country.subregion;
    const capitalCity = country.capital?.length ? country.capital[0] : "none";
    const area = country.area;
    const population = country.population;

    await Country.findOrCreate({
      where: {
        id,
      },
      defaults: {
        name,
        image,
        region,
        subregion,
        capitalCity,
        area,
        population,
      },
    });
  });
};
