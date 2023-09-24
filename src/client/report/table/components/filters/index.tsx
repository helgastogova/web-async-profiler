import React from 'react';
import { useData } from '@client/report/useData';
import { languages } from '@client/report/constants';
import { useTableReport } from '@client/report/table/useTableReport';
import { Button } from '@ui';

import s from './tableFilters.module.css';

export const TableFilters: React.FC = () => {
  const { data } = useData();
  const { collapseAll, expandAll, filterTypes, handleFilterTypeChange } = useTableReport(data);

  return (
    <div className={s.root}>
      <div className={s.controls}>
        <Button onClick={collapseAll}>Collapse All</Button>
        <Button onClick={expandAll}>Expand All</Button>
      </div>
      <div className={s.languages}>
        {Object.keys(languages).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={filterTypes?.[key] || false}
              onChange={(e) => handleFilterTypeChange(key, e.target.checked)}
            />
            {languages[key].name}
          </label>
        ))}
      </div>
    </div>
  );
};
