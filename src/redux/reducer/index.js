const init = {
  username: " ",
  theme: "day",
  xColor: "xLight",
  oColor: "oLight",
  background: "light.gif",
  mode: "CPU",
  player2: "CPU",
  avatar: "https://random.imagecdn.app/200/200",
  time: 0,
  break: false,
  score: 0,
  id: "",
  start_times: "",
  data: {},
  next_move: 0,
};

const rootReducer = (state = init, action) => {
  switch (action.type) {
    case "SET_USER":
      const username = action.payload;
      return {
        ...state,
        username,
      };
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
    case "SET_SCORE":
      const score = action.payload;
      return {
        ...state,
        score: score,
      };
    case "SET_ID":
      const id = action.payload;
      return {
        ...state,
        id: id,
      };
    case "SET_START_TIME":
      const startTime = action.payload;
      return {
        ...state,
        start_times: startTime,
      };
    case "SET_DATA_BOARD":
      const { board, nextMove } = action.payload;
      console.log(nextMove);
      return {
        ...state,
        data: board,
        next_move: nextMove,
      };
    case "GET_RANDOM_AVT":
      return {
        ...state,
        avatar: "https://random.imagecdn.app/200/200",
      };
    default:
      return state;
  }
};

export default rootReducer;
