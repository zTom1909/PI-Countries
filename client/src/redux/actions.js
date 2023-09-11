import { SET_COUNTRIES, FILTER_COUNTRIES, ORDER_COUNTRIES, SET_ACCESS, SET_EMAIL } from "./types";
import axios from "axios";

export const setEmail = (email) => ({
  type: SET_EMAIL,
  payload: email
})

export const setAccess = (access) => ({
  type: SET_ACCESS,
  payload: access
})

export const setCountries = (searchInput, email) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/countries?name=${searchInput}&email=${email}`
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
