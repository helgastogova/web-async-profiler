import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

import { Loader } from '@ui';
import { useData } from '@client/report/useData';
import { DataType } from '@client/report/types';

import s from './graph.module.css';

export const GraphReport: React.FC<{ dataProp: DataType }> = ({ dataProp }) => {
  const { data: hookData, loading, error } = useData();
  const ref = useRef(null);
  const [graphData, setGraphData] = useState<DataType[]>([]);

  useEffect(() => {
    const data = hookData || dataProp;
    if (data) setGraphData(data[0]?.ch);

    if (!data?.[0]) return;

    const svg = d3.select(ref.current).append('svg').attr('width', 800).attr('height', 600);
    const root = d3.hierarchy(data[0], (d) => d.ch);

    if (!root) return;

    root.sum((d) => d.self);

    const partition = d3.partition().size([600, root.height + 1]);
    partition(root);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg
      .selectAll('rect')
      .data(root.descendants())
      .enter()
      .append('rect')
      .attr('x', (d) => d.y0)
      .attr('y', (d) => d.x0)
      .attr('height', (d) => d.x1 - d.x0)
      .attr('width', (d) => d.y1 - d.y0)
      .attr('fill', (d) => color(d.data.name));

    svg
      .selectAll('text')
      .data(root.descendants())
      .enter()
      .append('text')
      .attr('x', (d) => d.y0 + 5)
      .attr('y', (d) => (d.x0 + d.x1) / 2)
      .text((d) => d.data.name);
  }, [hookData, dataProp]);

  console.log(graphData);

  if (loading) return <Loader className={s.loader} />;
  if (error) return <p>Error: {error}</p>;

  if (!graphData) return null;

  return <div ref={ref}></div>;
};
