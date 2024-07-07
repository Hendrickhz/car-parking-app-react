import axios from "axios";
import { useEffect, useState } from "react";

export function useProfile() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    getProfile({ signal: controller.signal });
    return () => controller.abort();
  }, []);

  async function getProfile({ signal } = {}) {
    setLoading(true);
    try {
      const res = await axios.get("profile", { signal });
      if (res.status < 300) {
        setData(res.data);
      }
    } catch (error) {
      return {};
    } finally {
      setLoading(false);
    }
  }
  async function updateProfile(data) {
    setLoading(true);
    setErrors({});
    setStatus("");

    return axios
      .put("profile", data)
      .then(() => {
        setStatus("Profile has been updated.");
      })
      .catch((error) => {
        if (error.response.status === 422) {
          setErrors(error.response.data.errors);
        }
      })
      .finally(() => setLoading(false));
  }

  return [{ data, setData, errors, loading, status }, updateProfile];
}
