import MenuButton from "./MenuButton";
import { Map, Store, Users } from "lucide-react";
import { Separator } from "@heroui/react";
import CreateButton from "./CreateButton";


const Sidenav = () => {

  return (
    <div className="bg-white w-1/4 p-3 flex flex-col justify-between h-full">
      <div className=" flex flex-col gap-3 items-center mt-3">
        <MenuButton text="Map" url="map" >
          <Map/>
        </MenuButton>
        <MenuButton text="Users" url="users">
          <Users/>
        </MenuButton>
        <MenuButton text="Shops" url="shops">
          <Store/>
        </MenuButton>

      </div>
      <div className="flex flex-col gap-3">
        <Separator />
        <CreateButton/>
      </div>
    </div>
  )
}

export default Sidenav