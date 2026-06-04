import { Check, X } from "lucide-react";
import type { FC } from "react";

interface IProps {
  text: string;
  isAuthorized: boolean;
}

const VisitTiming: FC<IProps> = ({ text, isAuthorized }) => {
  return (
    <div className="flex items-center gap-3">
      {isAuthorized ? <Check color="green" size={15} /> : <X color="red" size={15}/>}
      <p>{text}</p>
    </div>
  );
};

export default VisitTiming;
