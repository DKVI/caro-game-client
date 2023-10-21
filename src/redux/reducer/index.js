const init = {
  username: "kaiv",
  email: "khacvi2003@gmail.com",
  theme: "night",
  xColor: "xDark",
  oColor: "oDark",
  background: "dark.gif",
  mode: "CPU",
  player2: "",
};

const rootReducer = (state = init, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      const [theme, xColor, oColor, background] = action.payload;
      return {
        ...state,
        theme: theme,
        xColor: xColor,
        oColor: oColor,
        background: background,
      };
    default:
      return state;
  }
};

export default rootReducer;
