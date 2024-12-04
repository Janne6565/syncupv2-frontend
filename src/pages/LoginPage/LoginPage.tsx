import { Button, FormControl, Input } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import useApi from "hooks/useApi/useApi.tsx";
import { useSnackbar } from "notistack";
import useAuthentication from "hooks/useAuthentication/useAuthentication.tsx";
import { components } from "api/schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import StyledLink from "components/technical/StyledLink/StyledLink.tsx";
import syncupImage from "assets/authPages/StayInSync.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LoadedImage from "components/technical/LoadedImage/LoadedImage.tsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const { authenticate, isLoggedIn } = useAuthentication();
  const navigate = useNavigate();
  const { mutate, isError, isPending } = useMutation({
    mutationFn: async (
      data: components["schemas"]["AuthenticationUserRequest"],
    ) => {
      try {
        const response = await loginUser(data.email, data.password);

        const authResponse = await authenticate(response);
        if (authResponse) {
          console.log("Success");
          enqueueSnackbar("Login successful", {
            variant: "success",
          });
        } else {
          enqueueSnackbar(
            "Login failed (internal error; please contact an administrator)",
            { variant: "error" },
          );
        }
      } catch (error) {
        enqueueSnackbar("Login failed (" + error.name + ")", {
          variant: "error",
        });
        console.log("Error", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/profile");
    }
  }, [isLoggedIn]);

  const userLoginCallback = useCallback(async () => {
    mutate({ email, password });
  }, [email, password, mutate]);

  return (
    <>
      <div
        style={{
          width: "80%",
          display: "flex",
          justifyContent: "space-around",
          height: "100%",
          alignItems: "center",
        }}
      >
        <LoadedImage
          imageSource={syncupImage}
          width={1021}
          height={1703}
          style={{ width: "30%", height: "auto", borderRadius: "8px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
            width: "300px",
          }}
        >
          <h2>Login</h2>
          <div
            style={{ display: "flex", gap: "20px", flexDirection: "column" }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                userLoginCallback();
              }}
              style={{ display: "flex", flexDirection: "column", gap: "30px" }}
            >
              <Input
                placeholder={"E-Mail"}
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder={"Password"}
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
                error={isError}
              />
              <Button
                variant={"contained"}
                type={"submit"}
                disabled={isPending}
              >
                {!isPending ? "Login" : "Loading..."}
              </Button>
            </form>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <StyledLink
              to={"/register"}
              label={
                <>
                  <u>Dont have an account yet? Register here</u>
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
