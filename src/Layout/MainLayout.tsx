import Searchbar from "../Components/Search/Searchbar";
import Sidenav from "../Components/SideMenu/Sidenav";
import { Outlet } from "react-router-dom";


const MainLayout = () => {
  return (
    <div className="flex flex-col h-dvh bg-blue-200">
      <Searchbar />
      <div className="flex  w-screen h-dvh bg-green-200">
        <Sidenav />
        <div className="size-full">
        <Outlet/>
        </div>
      </div>
  </div>
  )
};

export default MainLayout;
