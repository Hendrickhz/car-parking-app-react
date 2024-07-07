import axios from "axios";
import { useNavigate } from "react-router-dom";
import { route } from "../routes";

export const useAuth = () => {
  const navigate = useNavigate();

  async function register(data) {
    const res = await axios.post("/auth/register", data);
    if (res.status < 300) {
      return navigate(route("vehicles.index"));
    }
  }
  return { register };
};

