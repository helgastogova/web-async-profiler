import { languages } from '../constants';
import { DataType } from '@client/report/types';

export const drawFrame = (
  context: CanvasRenderingContext2D,
  f: { left: number; width: number; color: string; title: string },
  y: number,
  alpha: boolean,
  px: number,
  x0: number,
) => {
  context.fillStyle = f.color;
  context.fillRect((f.left - x0) * px, y, f.width * px, 15);

  if (f.width * px >= 21) {
    const chars = Math.floor((f.width * px) / 7);
    const title = f.title.length <= chars ? f.title : f.title.substring(0, chars - 2) + '..';
    context.fillStyle = '#000000';
    context.fillText(title, Math.max(f.left - x0, 0) * px + 3, y + 12, f.width * px - 6);
  }

  if (alpha) {
    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
    context.fillRect((f.left - x0) * px, y, f.width * px, 15);
  }
};

export const transformGraphDataToFrames = (graphData: DataType[]): Frame[][] => {
  const levels: Frame[][] = [];

  const addFrames = (data: DataType[], level: number) => {
    if (!levels[level]) levels[level] = [];

    for (const item of data) {
      const frame: Frame = {
        left: item.self,
        width: item.total,
        color: languages[item.type].color,
        title: item.name,
      };

      levels[level].push(frame);
      if (item.ch && item.ch.length > 0) {
        addFrames(item.ch, level + 1);
      }
    }
  };

  addFrames(graphData, 0);

  return levels;
};
