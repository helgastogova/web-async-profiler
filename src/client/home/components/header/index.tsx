import React, { FC } from 'react';
import { TreeIcon } from '@ui/icons';
import { Text } from '@ui';

import s from './tableHeader.module.css';

interface TableHeaderProps {
  total?: number;
}

export const TableHeader: FC<TableHeaderProps> = ({ total }) => {
  return (
    <div className={s.root}>
      <TreeIcon />
      <Text variant="heading/small">Total samples: {total ?? ''}</Text>
    </div>
  );
};
