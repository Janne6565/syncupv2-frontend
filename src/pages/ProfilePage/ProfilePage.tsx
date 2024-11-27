import { AuthContext } from "main.tsx";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useApi from "hooks/useApi/useApi.tsx";

const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { getCurrentUser } = useApi();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await getCurrentUser();
    },
  });

  useEffect(() => {
    if (authContext.data.isLoggedIn == false) {
      console.log("Not logged in", authContext);
      navigate("/login");
    } else {
      console.log("Logged in", authContext.data.isLoggedIn);
    }
  }, [authContext.data.isLoggedIn, navigate]);

  return (
    <>
      <h1>Profile Page</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : isError ? (
        <h2>Error: {error.message}</h2>
      ) : (
        <div>
          <h2>Username: {data.usertag}</h2>
          <h2>Email: {data.email}</h2>
          <h2>Role: {data.role}</h2>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
