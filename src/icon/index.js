import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { LuCircle } from "react-icons/lu";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { GiImperialCrown, GiJewelCrown, GiQueenCrown } from "react-icons/gi";
import { FaPen } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
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

const editButton = (props) => {
  return (
    <FaPen size={props.size} className="hover:opacity-60 cursor-pointer" />
  );
};

const logoutButton = (props) => {
  return <IoLogOut size={props.size} color={props.color} />;
};

const userIcon = (props) => {
  return <FaUser size={props.size} color={props.color} />;
};

const settingIcon = (props) => {
  return <IoMdSettings size={props.size} color={props.color} />;
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
  editButton,
  logoutButton,
  userIcon,
  settingIcon,
};
