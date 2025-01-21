import React from "react";
import { Bell, Ellipsis } from "lucide-react";
const Sidebar = () => {
  const users = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      status: "active",
    },
    {
      name: "Jane Doe",
      email: "janedoe@example.com",
      status: "inactive",
    },
    {
      name: "Alice Doe",
      email: "alicedoe@example.com",
      status: "active",
    },
    {},
  ];
  return (
    <div>
      <div>
        <div className='flex justify-around  p-5'>
          <div className='flex  '>
            <div className='rounded-full bg-black'> hello</div>
            <div className='rounded-full bg-green-600 z-0  absolute'>yo</div>
          </div>
          <div className='flex'>
            <Bell />
            <Ellipsis />
          </div>
        </div>
        <div className=''>
          {users.map((user, index) => {
            return (
              <div key={index}>
                <div>{user.name}</div>
                <div>{user.email}</div>
                <div>{user.status}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
