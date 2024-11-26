import { Button, Input } from "@mui/material";
import { useCallback, useState } from "react";
import useApi from "hooks/useApi/useApi.tsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { registerUser } = useApi();

  const registerUserCallback = useCallback(async () => {
    const response = await registerUser(email, username, password);
    if (response.error) {
      setError(response.error);
    }
    console.log(response);
  }, [email, password, username]);

  return (
    <>
      <h1>Login</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
        <Input
          placeholder={"Username"}
          type={"text"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder={"E-Mail"}
          type={"email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder={"Password"}
          type={"password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant={"contained"}
          type={"submit"}
          onClick={registerUserCallback}
        >
          Register
        </Button>
      </div>
    </>
  );
};

export default LoginPage;
