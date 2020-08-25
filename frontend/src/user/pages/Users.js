import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Mehmed Duhovic",
      image: "https://www.w3schools.com/howto/img_avatar.png",
      places: 3,
    },
    {
      id: "u2",
      name: "Muamer Hrbatovic",
      image: "https://www.w3schools.com/howto/img_avatar.png",
      places: 10,
    },
    {
        id: "u3",
        name: "Nedim Hafizovic",
        image: "https://www.w3schools.com/howto/img_avatar.png",
        places: 1,
      },
      {
        id: "u4",
        name: "Adnan Lucevic",
        image: "https://www.w3schools.com/howto/img_avatar.png",
        places: 34,
      },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
