import { DARK_MODE } from "../actions/darkMode";

const initialState = {
  isDarkMode: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DARK_MODE:
      return {
        isDarkMode: action.isDarkMode,
      };

    default:
      return state;
  }
};
