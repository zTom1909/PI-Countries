import { GET_COUNTRIES, ADD_COUNTRIES, FILTER_COUNTRIES } from "./types";

export const getCountries = () => ({
  type: GET_COUNTRIES,
});

export const addCountries = (countries) => ({
  type: ADD_COUNTRIES,
  payload: countries,
});

export const filterCountries = (countries, filterType, filterInfo) => ({
  type: FILTER_COUNTRIES,
  payload: { countries, filterType, filterInfo },
});
