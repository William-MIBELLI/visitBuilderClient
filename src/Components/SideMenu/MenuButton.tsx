import { useState, type FC } from "react";

interface IProps {
  text: string;
  children: React.ReactNode;
  url?: string;
}

const MenuButton: FC<IProps> = ({ text, children }) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <div
      className={`w-full h-13 rounded-xl flex items-center justify-start cursor-pointer p-4  ${isSelected ? "bg-turquoise text-white" : "hover:bg-blue-50"}`}
      onClick={() => setIsSelected(!isSelected)}
    >
      <div className="flex gap-3 items-center">
        {children}
        <p className=" font-semibold text-sm">{text}</p>
      </div>
    </div>
  );
};

export default MenuButton;
