import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { route } from "../routes";

export function useVehicle(id = null) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== null) {
      const controller = new AbortController();
      getVehicle(id, { signal: controller.signal });
      return () => controller.abort();
    }
  }, [id]);
  async function getVehicle(id, { signal } = {}) {
    setLoading(true);
    return axios
      .get(`vehicles/${id}`, { signal })
      .then((res) => setData(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }
  //update vehicle
  async function updateVehicle(vehicle) {
    setLoading(true);
    setErrors({});
    return axios
      .put(`/vehicles/${vehicle.id}`, vehicle)
      .then(() => navigate(route("vehicles.index")))
      .catch((error) => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => setLoading(false));
  }

  //create vehicle
  async function createVehicle(data) {
    setErrors({});
    setLoading(true);

    return axios
      .post("vehicles", data)
      .then(() => navigate(route("vehicles.index")))
      .catch((error) => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => setLoading(false));
  }

  //delete vehicle
  async function destroyVehicle(vehicle){
    return axios.delete(`vehicles/${vehicle.id}`)
  }
  return {
    vehicle: { data, setData, errors, loading },
    createVehicle,
    updateVehicle,
    destroyVehicle
  };
}
