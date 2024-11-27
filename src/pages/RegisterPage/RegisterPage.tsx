import { Button, Input } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import useApi from "hooks/useApi/useApi.tsx";
import { useMutation } from "@tanstack/react-query";
import { components } from "api/schema";
import useAuthentication from "hooks/useAuthentication/useAuthentication.tsx";
import { enqueueSnackbar } from "notistack";
import { AuthContext } from "main.tsx";
import { useNavigate } from "react-router";

type registerData = components["schemas"]["RegisterUserRequest"];

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { authenticate, isLoggedIn } = useAuthentication();
  const { registerUser } = useApi();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

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
      <h1>Register</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
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
        <Button
          variant={"contained"}
          type={"submit"}
          onClick={userRegistrationCallback}
          disabled={isPending}
        >
          {isPending ? "Loading" : "Register"}
        </Button>
        <p>{isError && error.message}</p>
      </div>
    </>
  );
};

export default RegisterPage;
