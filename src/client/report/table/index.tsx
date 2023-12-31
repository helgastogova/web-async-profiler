import React from 'react';
import cx from 'classnames';
import { Table, Layout } from '@ui';
import { ArrowIcon } from '@ui/icons';
import { languages } from '../constants';
import { DataType } from '@client/report/types';
import { useTableReport } from './useTableReport';
import { Text } from '@ui';
import { TableHeader } from './components/header';
import { TableFilters } from './components/filters';

import s from './table.module.css';

export const TableReport: React.FC = ({ data }) => {
  const { filteredData, total: allTotal, toggledNodes, handleSort, handleToggle } = useTableReport(data);

  const renderRow = (node: DataType, level = 0) => {
    const { name, type, self, total, ch } = node;
    const isToggled = toggledNodes[name];

    if (!filteredData) return null;

    return (
      <>
        <Table.Row key={name}>
          <Table.Cell className={s.nameCell}>
            {ch ? (
              <button
                onClick={() => handleToggle(node)}
                className={s.toggler}
                style={{ paddingLeft: `${level * 10}px` }}
              >
                <span className={s.green}>
                  <ArrowIcon className={cx(isToggled && s.toggledIcon)} />{' '}
                </span>
                <Text variant="body/base">{name}</Text>
              </button>
            ) : (
              <Text variant="body/base" className={s.name} style={{ paddingLeft: `${level * 10}px` }}>
                {name}
              </Text>
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
      <TableHeader total={allTotal} />
      <TableFilters data={data} />
      <Table>
        <Table.Row>
          <Table.Cell className={s.nameCell} onClick={() => handleSort('name')}>
            Name
          </Table.Cell>
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
        {filteredData.map((item, i) => (
          <React.Fragment key={`${item.name}_${i}`}>{renderRow(item)}</React.Fragment>
        ))}
      </Table>
    </Layout>
  );
};
