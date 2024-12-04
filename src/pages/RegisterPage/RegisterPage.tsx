import { Button, Input } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import useApi from "hooks/useApi/useApi.tsx";
import { useMutation } from "@tanstack/react-query";
import { components } from "api/schema";
import useAuthentication from "hooks/useAuthentication/useAuthentication.tsx";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router";
import StyledLink from "components/technical/StyledLink/StyledLink.tsx";
import syncupImage from "assets/authPages/GetInSync.png";
import LoadedImage from "components/technical/LoadedImage/LoadedImage.tsx";

type registerData = components["schemas"]["RegisterUserRequest"];

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { authenticate, isLoggedIn } = useAuthentication();
  const { registerUser } = useApi();
  const navigate = useNavigate();

  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: async (data: registerData) => {
      try {
        const response = await registerUser(
          data.email,
          data.usertag,
          data.password,
        );

        const authResponse = await authenticate(response);
        if (authResponse) {
          console.log("Success");
          enqueueSnackbar(
            "Registration successful: " + JSON.stringify(response),
            { variant: "success" },
          );
        } else {
          enqueueSnackbar(
            "Registration failed (internal error; please contact an administrator)",
            { variant: "error" },
          );
        }
      } catch (error) {
        enqueueSnackbar("Registration failed (" + error.name + ")", {
          variant: "error",
        });
        console.log("Error", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    console.log("checking login");
    if (isLoggedIn()) {
      navigate("/profile");
    }
  }, [isLoggedIn, navigate]);

  const userRegistrationCallback = useCallback(async () => {
    mutate({ email, usertag: username, password });
  }, [email, mutate, password, username]);

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
          <h2>Register</h2>
          <div
            style={{ display: "flex", gap: "20px", flexDirection: "column" }}
          >
            <Input
              placeholder={"E-Mail"}
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
            />
            <Input
              placeholder={"Username"}
              type={"text"}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isPending}
            />
            <Input
              placeholder={"Password"}
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Button
              variant={"contained"}
              type={"submit"}
              onClick={userRegistrationCallback}
              disabled={isPending}
            >
              {isPending ? "Registering..." : "Register"}
            </Button>
            <StyledLink
              to={"/login"}
              label={
                <>
                  <u>Already have an account? Login here</u>
                </>
              }
            />
            <p>{isError && error.message}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
