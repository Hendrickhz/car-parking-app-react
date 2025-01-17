import axios from "axios";
import { useNavigate } from "react-router-dom";
import { route } from "../routes";
import { useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use-storage";

export const useAuth = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken, removeAccessToken] = useLocalStorage();

  const navigate = useNavigate();

  const isLoggedIn = useMemo(() => !!accessToken, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  }, [accessToken]);

  //register user
  async function register(data) {
    setErrors({});
    setIsLoading(true);
    try {
      const res = await axios.post("/auth/register", data);
      if (res.status < 300) {
        setAccessToken(res.data.access_token);
        return navigate(route("vehicles.index"));
      }
    } catch (error) {
      if (error.response.status == 422) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  }

  //login user
  async function login(data) {
    setErrors({});
    setIsLoading(true);

    try {
      const res = await axios.post("/auth/login", data);
      if (res.status < 300) {
        setAccessToken(res.data.access_token);
        navigate(route("parkings.active"));
      }
    } catch (error) {
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsLoading(false);
    }
  }

  //logout user
  async function logout(force = false) {
    if (!force) {
      await axios.post("auth/logout");
    }
    removeAccessToken();
    navigate("login");
  }
  return { register,login, errors, isLoading, isLoggedIn, logout };
};
