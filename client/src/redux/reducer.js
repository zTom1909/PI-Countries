import { GET_COUNTRIES, ADD_COUNTRIES, FILTER_COUNTRIES } from "./types";
const initialState = {
  allCountries: [],
  filteredCountries: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES:
      return { ...state, filteredCountries: state.allCountries };

    case ADD_COUNTRIES:
      return { ...state, allCountries: payload, filteredCountries: payload };

    case FILTER_COUNTRIES:
      const { filterType, filterInfo, countries } = payload;

      switch (filterType) {
        case "continent":
          const filteredCountriesByContinent = countries.filter((country) =>
            filterInfo.includes(country.region)
          );
          return { ...state, filteredCountries: filteredCountriesByContinent };

        case "activity":
          const filteredCountriesByActivity = countries.filter((country) => {
            let { difficulty, season } = filterInfo;
            return country?.Activities?.some(
              (activity) =>
                (difficulty ? activity.difficulty === difficulty : true) &&
                (season ? activity.season === season : true)
            );
          });
          return { ...state, filteredCountries: filteredCountriesByActivity };

        default:
          return state;
      }
    default:
      return state;
  }
};

export default reducer;
