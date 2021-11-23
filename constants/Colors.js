import { useEffect } from "react";
import { useSelector } from "react-redux";
var isDarkMode;
export const darkMode = (isDark) => {
  isDarkMode = true;
  console.log("colors " + isDarkMode);

  return {
    primary: isDarkMode ? "#212121" : "white",
    buttonColor: isDarkMode ? "#d1d1d1" : "#454545",
    text: isDarkMode ? "white" : "#454545",
    // accent: "white",
    cardBg: isDarkMode ? "#303030" : "white",
    tabSlider: isDarkMode ? "#d1d1d1" : "#454545",
  };
};
// darkMode();
// console.log(isDarkMode + "check");
export default {
  primary: "white",
  text: "#454545",
  buttonColor: "#454545",
  accent: "#ccc",
  cardBg: "white",
  tabSlider: "#454545",
  // primary: "#212121",
  // buttonColor: "#d1d1d1",
  // text: "white",
  // // accent: "white",
  // cardBg: "#303030",
  // tabSlider: "#d1d1d1",
};
