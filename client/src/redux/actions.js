import { SET_COUNTRIES, FILTER_COUNTRIES, ORDER_COUNTRIES, SET_ACCESS } from "./types";
import axios from "axios";

export const setAccess = (access) => ({
  type: SET_ACCESS,
  payload: access
})

export const setCountries = (searchInput) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/countries?name=${searchInput}`
    );
    return dispatch({
      type: SET_COUNTRIES,
      payload: data,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const filterCountries = (filters) => ({
  type: FILTER_COUNTRIES,
  payload: filters,
});

export const orderCountries = (order) => ({
  type: ORDER_COUNTRIES,
  payload: order,
});
