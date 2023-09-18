import { useEffect, useState } from 'react';
import { JsonDataType } from '@client/report/types';

export const useData = () => {
  const [data, setData] = useState<JsonDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    fetch('http://localhost:5001/data')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};
