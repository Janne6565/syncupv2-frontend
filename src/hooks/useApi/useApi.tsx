import { useContext } from "react";
import { ConfigContext } from "main.tsx";
import { useCookies } from "react-cookie";
import { components } from "api/schema";

const useHttpClient = (baseUrl: string) => {
  const [cookies] = useCookies(["authToken"]);
  const token = cookies[
    "authToken"
  ] as components["schemas"]["AuthenticationResponse"];
  const headers = token.access_token
    ? {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };

  const get = async (path: string, overrideHeaders = undefined) => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      headers: overrideHeaders ?? headers,
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error();
      error.name = responseData.message;
      error.message = JSON.stringify(responseData.error);
      throw error;
    }

    return responseData;
  };

  const post = async (path: string, data: any, overrideHeaders = undefined) => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: overrideHeaders ?? headers,
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error();
      error.name = responseData.message;
      error.message = JSON.stringify(responseData.error);
      throw error;
    }

    return responseData;
  };

  const put = async (path: string, data: any, overrideHeaders = undefined) => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "PUT",
      headers: overrideHeaders ?? headers,
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error();
      error.name = responseData.message;
      error.message = JSON.stringify(responseData.error);
      throw error;
    }

    return responseData;
  };

  const remove = async (path: string, overrideHeaders = undefined) => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "DELETE",
      headers: overrideHeaders ?? headers,
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error();
      error.name = responseData.message;
      error.message = JSON.stringify(responseData.error);
      throw error;
    }

    return response.json();
  };

  return { get, post, put, remove };
};

const useApi = () => {
  const { baseUrl } = useContext(ConfigContext);
  const httpClient = useHttpClient(baseUrl);

  const loginUser = async (email: string, password: string) => {
    return (await httpClient.post("/auth/login", {
      email,
      password,
    })) as components["schemas"]["AuthenticationResponse"];
  };

  const registerUser = async (
    email: string,
    usertag: string,
    password: string,
  ): Promise<components["schemas"]["AuthenticationResponse"]> => {
    return await httpClient.post("/auth/user", { email, usertag, password });
  };

  const getUser = (userId: string) => {
    return httpClient.get(`/authorized/user/${userId}`);
  };

  const getCurrentUser = () => {
    return httpClient.get(`/authorized/user`) as Promise<
      components["schemas"]["PrivateUserDto"]
    >;
  };

  const checkAuth = async (
    authToken: string,
    userId: string,
  ): Promise<boolean> => {
    try {
      const responseData = (await httpClient.get("/authorized/user", {
        Authorization: "Bearer " + authToken,
      })) as components["schemas"]["PrivateUserDto"];

      return responseData.id === userId;
    } catch {
      return false;
    }
  };

  return { loginUser, registerUser, getCurrentUser, getUser, checkAuth };
};

export default useApi;
