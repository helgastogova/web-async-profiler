import React, { useEffect, useState } from 'react';
import { Loader, Chart } from '@ui';
import { useData } from '@client/report/useData';
import { DataType } from '@client/report/types';
import { sortData } from '@client/report/utils';

import s from './chart.module.css';

export const ChartReport: React.FC = () => {
  const { data, loading, error } = useData();
  const [chartData, setChartData] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      const sordedData = sortData(data[0]?.ch);
      setChartData({ ...data[0], ch: sordedData });
    }
  }, [data]);

  if (loading) return <Loader className={s.loader} />;
  if (error) return <p>Error: {error}</p>;

  if (!chartData) return null;

  console.log(chartData);

  return (
    <Chart>
      {chartData?.ch?.map((item, i) => {
        const { total, name } = item;
        const width = `${Math.round((total / chartData.total) * 10000) / 100}%`;

        return (
          <Chart.Item key={`${item.name}_${i}`} width={width}>
            {name}/ {total}, {width}
          </Chart.Item>
        );
      })}
    </Chart>
  );
};
