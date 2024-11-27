import { Button, Input } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import useApi from "hooks/useApi/useApi.tsx";
import { useSnackbar } from "notistack";
import useAuthentication from "hooks/useAuthentication/useAuthentication.tsx";
import { components } from "api/schema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

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
      <h1>Login</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
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
          onClick={userLoginCallback}
          disabled={isPending}
        >
          Login
        </Button>
      </div>
    </>
  );
};

export default LoginPage;
