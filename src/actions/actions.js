// FETCH

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_ERROR = "FETCH_ERROR";

export const fetchStart = () => {
  return { type: FETCH_START };
};

export const fetchSuccess = (events) => {
  return { type: FETCH_SUCCESS, payload: events };
};

export const fetchError = () => {
  return {
    type: FETCH_ERROR,
    payload: "An error occurred while fetching data.",
  };
};

// CATEGORY
export const CREATE_CATEGORIES = "CREATE_CATEGORIES";
export const SET_CATEGORY = "SET_CATEGORY";

export const createCategories = (categories) => {
  return { type: CREATE_CATEGORIES, payload: categories };
};

export const setCategory = (category) => {
  return { type: SET_CATEGORY, payload: category };
};

// SEARCH

export const SET_SEARCH_TERM = "SET_SEARCH_TERM";

export const setSearchTerm = (term) => {
  return { type: SET_SEARCH_TERM, payload: term };
};

// EVENT
export const ADD_EVENT = "ADD_EVENT";
export const DELETE_EVENT = "DELETE_EVENT";

export const addEvent = (event) => {
  return { type: ADD_EVENT, payload: event };
};

export const deleteEvent = (id) => {
  return { type: DELETE_EVENT, payload: id };
};

// MODAL

export const OPEN_DELETE_MODAL = "OPEN_DELETE_MODAL";
export const CLOSE_DELETE_MODAL = "CLOSE_DELETE_MODAL";
