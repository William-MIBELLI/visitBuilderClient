import React from "react";
import Searchbar from "../Components/Search/Searchbar";
import Sidenav from "../Components/SideMenu/Sidenav";


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-dvh bg-blue-200">
      <Searchbar />
      <div className="flex  w-screen h-dvh bg-green-200">
        <Sidenav />
        <div className="size-full">
        {children}

        </div>
      </div>
  </div>
  )
};

export default MainLayout;
