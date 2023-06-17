import React from "react";

const Users = ({ address, name, message }) => {
  return (
    <div className="md:mx-28 my-8 bg-[#FFEE00] md:px-20 text-black rounded">
      <div className="flex justify-between">
        <div className="">
          <span className="font-bold"> Name: </span>
          {name}
        </div>
        <div><span className="font-bold">Message:</span>{message}</div>
      </div>
      <div className="text-center mt-2 "><span className="font-bold">Address:</span>{address}</div>
    </div>
  );
};

export default Users;
