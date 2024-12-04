import { AuthContext } from "main.tsx";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useApi from "hooks/useApi/useApi.tsx";
import useAuthentication from "hooks/useAuthentication/useAuthentication.tsx";
import { Button } from "@mui/material";

const ProfilePage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { logout } = useAuthentication();
  const { getCurrentUser } = useApi();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return await getCurrentUser();
    },
  });

  useEffect(() => {
    if (authContext.data.isLoggedIn == false) {
      navigate("/login");
    }
  }, [authContext.data.isLoggedIn, navigate]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Profile Page</h1>
      <div>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : isError ? (
          <h2>Error: {error.message}</h2>
        ) : (
          <>
            <div>
              <h2>Username: {data.usertag}</h2>
              <h2>Email: {data.email}</h2>
              <h2>Role: {data.role}</h2>
            </div>
            <Button variant={"outlined"} onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
