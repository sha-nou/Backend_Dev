import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Body from "../RightSidebar/Body";

const Home = () => {
  return (
    <div>
      <div className='flex justify-between'>
        <div className='flex flex-[0.5]  min-h-screen'>
          <Sidebar />
        </div>
        <div className='flex flex-[1.5] bg-blue-400'>
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Home;
