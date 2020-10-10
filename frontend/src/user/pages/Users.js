import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import Loader from "./../../shared/components/Loader/Loader";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const responseData = await response.json();
        console.log(responseData);
        setLoadedUsers(responseData.users);

        if (!response.ok) {
          throw new Error(responseData.message);
        }
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };

    sendRequest();
  }, []);
  return (
    <React.Fragment>
      {isLoading && <Loader></Loader>}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
