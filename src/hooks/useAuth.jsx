import axios from "axios";
import { useNavigate } from "react-router-dom";
import { route } from "../routes";
import { useState } from "react";

export const useAuth = () => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function register(data) {
    setErrors({});
    setIsLoading(true)
    try {
      const res = await axios.post("/auth/register", data);
      if (res.status < 300) {
        return navigate(route("vehicles.index"));
      }
    } catch (error) {
      if (error.response.status == 422) {
        setErrors(error.response.data.errors);
      }
    }finally{
      setIsLoading(false)
    }
  }
  return { register, errors,isLoading };
};
