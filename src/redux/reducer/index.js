const init = {
  username: "kaiv",
  email: "khacvi2003@gmail.com",
  theme: "night",
  xColor: "xDark",
  oColor: "oDark",
  background: "dark.gif",
  mode: "CPU",
  player2: "CPU",
  avatar: "https://random.imagecdn.app/200/200",
  time: 0,
  break: false,
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
    case "IS_BREAK":
      const isBreak = action.payload;
      return {
        ...state,
        break: isBreak,
      };
    case "SET_TIME":
      const time = action.payload;
      return {
        ...state,
        time,
      };
    default:
      return state;
  }
};

export default rootReducer;
