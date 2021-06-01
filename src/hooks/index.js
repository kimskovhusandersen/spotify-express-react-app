import { useState, useEffect } from "react";
import axios from "axios";

export const useRequest = (initUrl) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetch() {
      if (!ignore) {
        setLoading(true);
      }
      try {
        const { data } = await axios(initUrl);
        if (!ignore) {
          setError(null);
          setData(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetch();

    return () => (ignore = true);
  }, [initUrl]);

  return { data, loading, error };
};
