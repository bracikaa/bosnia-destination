import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import Loader from "./../../shared/components/Loader/Loader";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
    };

    fetchUsers();
  }, [sendRequest]);
  return (
    <React.Fragment>
      {error && <div>Something went wrong, please try again</div>}
      {isLoading && <Loader></Loader>}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
