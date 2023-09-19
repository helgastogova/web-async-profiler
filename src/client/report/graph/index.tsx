import React, { useEffect, useState } from 'react';
import { Loader } from '@ui';
import { useData } from '@client/report/useData';
import { DataType } from '@client/report/types';
import s from './table.module.css';

export const GraphReport: React.FC<{ data: DataType }> = () => {
  const { data, loading, error } = useData();
  const [graphData, setGraphData] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) setGraphData(data[0]?.ch);
  }, [data]);

  console.log(graphData);

  if (loading) return <Loader className={s.loader} />;
  if (error) return <p>Error: {error}</p>;

  if (!graphData) return null;

  return <>graph</>;
};
