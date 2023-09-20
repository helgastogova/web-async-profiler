import React, { useRef, useEffect, useState } from 'react';
import { drawFrame, transformGraphDataToFrames } from './utils';
import { Loader } from '@ui';
import { useData } from '@client/report/useData';
import { DataType } from '@client/report/types';

import s from './graph.module.css';

interface Frame {
  left: number;
  width: number;
  color: string;
  title: string;
}

export const GraphReport: React.FC = () => {
  const { data, loading, error } = useData();
  const [graphData, setGraphData] = useState<DataType[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (data) setGraphData(data[0]?.ch);
    if (!data?.[0]) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const levels: Frame[][] = transformGraphDataToFrames(graphData);

    const root = levels[0][0];
    const px = canvas.width / root.width;
    const x0 = root.left;

    levels.forEach((frames, h) => {
      const y = h * 16;
      frames.forEach((f) => {
        drawFrame(context, f, y, false, px, x0);
      });
    });
  }, [data]);

  console.log(graphData);

  if (loading) return <Loader className={s.loader} />;
  if (error) return <p>Error: {error}</p>;

  if (!graphData) return null;

  return (
    <canvas ref={canvasRef} width="1700" height="800" style={{ width: '100%' }}>
      Canvas not supported
    </canvas>
  );
};
