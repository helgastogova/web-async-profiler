import React from 'react';
import { Table, Loader, Layout } from '@ui';
import { useData } from '@client/report/useData';
import { languages } from '../constants';
import { DataType } from '@client/report/types';
import { useTableReport } from './useTableReport';
import { Text, Button } from '@ui';

import s from './table.module.css';

export const TableReport: React.FC = () => {
  const { data, loading, error } = useData();
  const {
    sortedData,
    total: allTotal,
    toggledNodes,
    handleSort,
    handleToggle,
    collapseAll,
    expandAll,
  } = useTableReport(data);

  const renderRow = (node: DataType, level = 0) => {
    const { name, type, self, total, ch } = node;
    const isToggled = toggledNodes[name];

    if (loading) return <Loader className={s.loader} />;
    if (error) return <p>Error: {error}</p>;
    if (!sortedData) return null;

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
          <Table.Cell align="center">
            <div style={{ color: languages[type].color }}>{languages[type].name}</div>
          </Table.Cell>
          <Table.Cell align="center">{self}</Table.Cell>
          <Table.Cell align="center">
            <div className={s.stat}>
              <div className={s.statTotal}>{total}</div>{' '}
              <Text color="grey">{Math.round((total / allTotal) * 100)}%</Text>
            </div>
          </Table.Cell>
        </Table.Row>
        {isToggled &&
          ch?.map((item, i) => <React.Fragment key={`${item.name}_${i}`}>{renderRow(item, level + 1)}</React.Fragment>)}
      </>
    );
  };

  return (
    <Layout>
      <div className={s.controls}>
        <div>total: {allTotal}</div>
        <Button onClick={collapseAll}>Collapse All</Button>
        <Button onClick={expandAll}>Expand All</Button>
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
        {sortedData.map((item, i) => (
          <React.Fragment key={`${item.name}_${i}`}>{renderRow(item)}</React.Fragment>
        ))}
      </Table>
    </Layout>
  );
};
