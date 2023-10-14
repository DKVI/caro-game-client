import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { LuCircle } from "react-icons/lu";
const X = ({ color }) => {
  return (
    <RxCross1
      className={"m-auto " + `text-${color}`}
      style={{
        color: color,
      }}
    />
  );
};
const O = ({ color }) => {
  return (
    <LuCircle
      className={"m-auto " + `color-${color}`}
      style={{
        color: color,
      }}
    />
  );
};
export { AiFillEyeInvisible, AiFillEye, X, O };
