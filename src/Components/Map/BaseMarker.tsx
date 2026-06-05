import type { FC } from "react";

interface IProps {
  id: number;
  lat: number;
  lng: number;
}

const BaseMarker: FC<IProps> = () => {
  return <div>BaseMarker</div>;
};

export default BaseMarker;
