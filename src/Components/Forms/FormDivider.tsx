import type { FC } from "react";

interface IProps {
  label: string;
}

const FormDivider: FC<IProps> = ({ label }) => {
  return (
    <div className="col-span-2">
      <h3 className="font-bold text-sm text-white italic rounded-xl bg-turquoise my-1 pl-4 py-0.5">{label}</h3>
      {/* <Separator/> */}
    </div>
  )
}

export default FormDivider