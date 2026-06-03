import { type FC } from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  text: string;
  children: React.ReactNode;
  url: string;
}

const MenuButton: FC<IProps> = ({ text, children, url }) => {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        `w-full h-13 rounded-xl flex items-center justify-start cursor-pointer p-4  ${isActive ? "bg-turquoise text-white" : "hover:bg-blue-50"}`
      }
    >
      <div className="flex gap-3 items-center">
        {children}
        <p className=" font-semibold text-sm">{text}</p>
      </div>
    </NavLink>
  );
};

export default MenuButton;
