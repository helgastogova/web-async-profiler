import React, { FC, HTMLAttributes } from 'react';
import cx from 'classnames';

import s from './chart.module.css';

type ChartProps = {
  children: React.ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

type ChartCellProps = {
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

type ChartItemProps = {
  className?: string;
  width: string;
} & HTMLAttributes<HTMLDivElement>;

export const ChartItem: FC<ChartItemProps> = ({ className, width, children, ...rest }) => {
  return (
    <div className={cx(s.item, className)} {...rest} style={{ width: width + 'vw', height: width + 'vh' }}>
      {children}
    </div>
  );
};

export const ChartCell: FC<ChartCellProps> = ({ className, children, ...rest }) => {
  return (
    <div className={cx(s.cell, className)} {...rest}>
      {children}
    </div>
  );
};

export const Chart: FC<ChartProps> = ({ children, className, ...rest }) => {
  return (
    <div className={cx(s.chart, className)} {...rest}>
      {children}
    </div>
  );
};
