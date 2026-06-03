import { useState } from "react"
import MenuButton from "./MenuButton";
import { Map, Store, Users } from "lucide-react";
import { Separator } from "@heroui/react";
import CreateButton from "./CreateButton";

type TList = "MAP" | "USERS" | "SHOPS";

const Sidenav = () => {

  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [selectedLink, setSelectedLink] = useState<TList>("MAP");

  return (
    <div className="bg-white w-1/4 p-3 flex flex-col justify-between">
      <div className=" flex flex-col gap-3 items-center mt-3">
        <MenuButton text="Map">
          <Map/>
        </MenuButton>
        <MenuButton text="Users">
          <Users/>
        </MenuButton>
        <MenuButton text="Shops">
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