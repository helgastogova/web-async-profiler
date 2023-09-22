// TableReport.tsx
import React from 'react';
import { Table, Loader, Layout } from '@ui';
import { useData } from '@client/report/useData';
import { languages } from '../constants';
import { DataType } from '@client/report/types';
import { useTableReport } from './useTableReport';

import s from './table.module.css';

export const TableReport: React.FC = () => {
  const { data, loading, error } = useData();
  const { sortedGraphData, toggledNodes, handleSort, handleToggle, collapseAll, expandAll } = useTableReport(data);

  const renderRow = (node: DataType, level = 0) => {
    const { name, type, self, total, ch } = node;
    const isToggled = toggledNodes[name];

    if (loading) return <Loader className={s.loader} />;
    if (error) return <p>Error: {error}</p>;
    if (!sortedGraphData) return null;

    return (
      <>
        <Table.Row key={name}>
          <Table.Cell>
            {ch ? (
              <button
                onClick={() => handleToggle(node)}
                className={s.toggler}
                style={{ paddingLeft: `${level * 10}px` }}
              >
                <span className={s.green}>{isToggled ? '–' : '+'} </span>
                {name}
              </button>
            ) : (
              <div className={s.name} style={{ paddingLeft: `${level * 10}px` }}>
                {name}
              </div>
            )}
          </Table.Cell>
          <Table.Cell align="center">{languages[type].name}</Table.Cell>
          <Table.Cell align="center">{self}</Table.Cell>
          <Table.Cell align="center">{total}</Table.Cell>
        </Table.Row>
        {isToggled &&
          ch?.map((item, i) => <React.Fragment key={`${item.name}_${i}`}>{renderRow(item, level + 1)}</React.Fragment>)}
      </>
    );
  };

  return (
    <Layout>
      <div className={s.controls}>
        <button onClick={collapseAll}>Collapse All</button>
        <button onClick={expandAll}>Expand All</button>
      </div>
      <Table>
        <Table.Row>
          <Table.Cell onClick={() => handleSort('name')}>Name</Table.Cell>
          <Table.Cell align="center" onClick={() => handleSort('type')}>
            Type
          </Table.Cell>
          <Table.Cell align="center" onClick={() => handleSort('self')}>
            Self
          </Table.Cell>
          <Table.Cell align="center" onClick={() => handleSort('total')}>
            Total
          </Table.Cell>
        </Table.Row>
        {sortedGraphData.map((item, i) => (
          <React.Fragment key={`${item.name}_${i}`}>{renderRow(item)}</React.Fragment>
        ))}
      </Table>
    </Layout>
  );
};
