import { useContext } from "react";
import { ApplicationContext } from "main.tsx";
import { components } from "api/schema";
import { useCookies } from "react-cookie";

const useHttpClient = (baseUrl) => {
  const [cookies, setCookies, removeCookie] = useCookies();
  const token = cookies["authToken"];
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : {
        "Content-Type": "application/json",
      };

  const get = async (path: string) => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "GET",
      headers: headers,
    });
    return await response.json();
  };

  const post = async (path: string, data: any) => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  const put = async (path: string, data: any) => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(data),
    });
    return await response.json();
  };

  const remove = async (path: string) => {
    const response = await fetch(`${baseUrl}${path}`, {
      method: "DELETE",
      headers: headers,
    });
    return await response.json();
  };

  return { get, post, put, remove };
};

const useApi = () => {
  const { baseUrl } = useContext(ApplicationContext);
  const httpClient = useHttpClient(baseUrl);

  const loginUser = async (username: string, password: string) => {
    return await httpClient.post("/auth/login", { username, password });
  };

  const registerUser = async (
    email: string,
    usertag: string,
    password: string,
  ) => {
    return await httpClient.post("/auth/user", { email, usertag, password });
  };

  const getUser = (userId: string) => {
    return httpClient.get(`/auth/user/${userId}`);
  };

  const getCurrentUser = () => {
    return httpClient.get(`/auth/user`);
  };

  return { loginUser, registerUser, getCurrentUser, getUser };
};

export default useApi;
