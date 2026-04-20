import {
  CREATE_CATEGORIES,
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  SET_CATEGORY,
  SET_SEARCH_TERM,
} from "../actions/actions";

export const initialState = {
  events: [],
  isLoading: false,
  error: false,
  searchTerm: "",
  categories: [],
  selectedCategory: "All",
  isDeleteModalOpen: false,
  selectedEvent: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, isLoading: true };
    case FETCH_SUCCESS:
      return {
        ...state,
        events: [...state.events, ...action.payload],
        isLoading: false,
      };
    case FETCH_ERROR:
      return { ...state, isLoading: false, error: true };
    case CREATE_CATEGORIES:
      return { ...state, categories: [...state.categories, ...action.payload] };
    case SET_CATEGORY:
      return { ...state, selectedCategory: action.payload };
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
};
