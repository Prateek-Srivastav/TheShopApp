export const DARK_MODE = "DARK_MODE";

export const toggleDarkMode = (isDarkMode) => {
  return (dispatch) => {
    dispatch({
      type: DARK_MODE,
      isDarkMode: isDarkMode,
    });
  };
};
