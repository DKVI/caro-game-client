const init = {
  username: "kaiv",
  email: "khacvi2003@gmail.com",
  theme: "day",
  xColor: "xLight",
  oColor: "oLight",
  background: "light.gif",
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
    case "SET_MODE":
      const mode = action.payload;
      return {
        ...state,
        mode,
      };
    case "SET_PLAYER_2_NAME":
      const userName = action.payload;
      return {
        ...state,
        player2: userName,
      };
    default:
      return state;
  }
};

export default rootReducer;
