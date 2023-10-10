import React, { useEffect, useState } from 'react';
import { Chart } from '@ui';
import { DataType } from '@client/report/types';
import { sortData } from '@client/report/utils';

export const ChartReport: React.FC = ({ data }) => {
  const [chartData, setChartData] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      const sordedData = sortData(data[0]?.ch);
      setChartData({ ...data[0], ch: sordedData });
    }
  }, [data]);

  if (!chartData) return null;

  return (
    <Chart>
      {chartData?.ch?.map((item, i) => {
        const { total, name } = item;
        const width = `${Math.round((total / chartData.total) * 10000) / 100}`;

        return (
          <Chart.Item key={`${item.name}_${i}`} width={width}>
            {name}/ {total}, {width}
          </Chart.Item>
        );
      })}
    </Chart>
  );
};
