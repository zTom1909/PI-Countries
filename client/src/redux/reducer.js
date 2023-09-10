import { SET_COUNTRIES, FILTER_COUNTRIES, ORDER_COUNTRIES } from "./types";
const initialState = {
  allCountries: [],
  filteredCountries: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_COUNTRIES:
      return { ...state, allCountries: payload, filteredCountries: payload };

    case FILTER_COUNTRIES:
      const { filterType, filterInfo } = payload;

      switch (filterType) {
        case "continent":
          if (!filterInfo)
            return { ...state, filteredCountries: state.allCountries };
          const filteredCountriesByContinent = state.allCountries.filter(
            (country) => filterInfo === country.region
          );
          return { ...state, filteredCountries: filteredCountriesByContinent };

        case "activity":
          let { difficulty, season } = filterInfo;
          if (!difficulty && !season)
            return { ...state, filteredCountries: state.allCountries };
          const filteredCountriesByActivity = state.allCountries.filter(
            (country) => {
              return country.Activities?.some(
                (activity) =>
                  (!difficulty || difficulty === activity.difficulty) &&
                  (!season || season === activity.season)
              );
            }
          );
          return { ...state, filteredCountries: filteredCountriesByActivity };

        default:
          return state;
      }

    case ORDER_COUNTRIES:
      const { orderType, sortOrder } = payload;
      switch (orderType) {
        case "name":
          const orderedCountriesByName = state.filteredCountries.sort(
            (a, b) => {
              if (sortOrder.toUpperCase() === "A")
                return a.name.localeCompare(b.name);
              else return b.name.localeCompare(a.name);
            }
          );
          return { ...state, filteredCountries: orderedCountriesByName };
        case "population":
          const orderedCountriesByPopulation = state.filteredCountries.sort(
            (a, b) => {
              if (sortOrder.toUpperCase() === "A")
                return a.population - b.population;
              else return b.population - a.population;
            }
          );
          return { ...state, filteredCountries: orderedCountriesByPopulation };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default reducer;
