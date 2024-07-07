import axios from "axios";
import { useEffect, useState } from "react";

export function useVehicles() {
  const [vehicles, setVehicles] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    getVehicles({ signal: controller.signal });
    return () => {
      controller.abort();
    };
  }, []);

  async function getVehicles({ signal } = {}) {
    return axios
      .get("vehicles", { signal })
      .then((response) => setVehicles(response.data.data))
      .catch(() => {});
  }
  return { vehicles, getVehicles };
}
