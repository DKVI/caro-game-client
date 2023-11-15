import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { LuCircle } from "react-icons/lu";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { GiImperialCrown, GiJewelCrown, GiQueenCrown } from "react-icons/gi";
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

const silverCrown = () => {
  return (
    <GiQueenCrown
      size={18}
      className="text-[#C0C0C0] m-auto"
      style={{
        filter: "drop-shadow(2px 4px 1px #cccc)",
      }}
    />
  );
};

const goldCrown = () => {
  return (
    <GiImperialCrown
      size={18}
      className="text-[#FFD700] m-auto"
      style={{
        filter: "drop-shadow(2px 4px 1px #cccc)",
      }}
    />
  );
};

const bronzeCrown = () => {
  return (
    <GiJewelCrown
      size={18}
      className="text-[#CD7F32] m-auto"
      style={{
        filter: "drop-shadow(2px 4px 1px #cccc)",
      }}
    />
  );
};
export {
  AiFillEyeInvisible,
  AiFillEye,
  X,
  O,
  HiOutlineDesktopComputer,
  LiaUserFriendsSolid,
  silverCrown,
  goldCrown,
  bronzeCrown,
};
