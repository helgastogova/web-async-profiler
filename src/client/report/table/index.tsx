import React, { useEffect, useState } from 'react';
import { Table } from '@ui';
import { languages } from './constants';

type DataType = {
  name: string;
  type: number;
  self: number;
  total: number;
  ch?: DataType[];
};

type ToggleState = { [key: string]: boolean };

export const TableReport: React.FC<{ data: DataType }> = ({ data }) => {
  const [graphData, setGraphData] = useState<DataType[]>([]);
  const [toggledNodes, setToggledNodes] = useState<ToggleState>({});

  useEffect(() => {
    if (data) setGraphData([data]);
  }, [data]);

  const handleToggle = (nodeName: string) => {
    setToggledNodes({
      ...toggledNodes,
      [nodeName]: !toggledNodes[nodeName],
    });
  };

  const renderRow = (node: DataType, level = 0) => {
    const { name, type, self, total, ch } = node;
    const isToggled = toggledNodes[name];

    return (
      <>
        <Table.Row key={name}>
          <Table.Cell>
            {ch && <button onClick={() => handleToggle(name)}>{isToggled ? '–' : '+'}</button>}
            {name}
          </Table.Cell>
          <Table.Cell align="center">{languages[type]}</Table.Cell>
          <Table.Cell align="center">{self}</Table.Cell>
          <Table.Cell align="center">{total}</Table.Cell>
        </Table.Row>
        {isToggled &&
          ch?.map((item, i) => <React.Fragment key={`${item.name}_${i}`}>{renderRow(item, level + 1)}</React.Fragment>)}
      </>
    );
  };

  return (
    <Table>
      <Table.Row>
        <Table.Cell>Name</Table.Cell>
        <Table.Cell align="center">Type</Table.Cell>
        <Table.Cell align="center">Self</Table.Cell>
        <Table.Cell align="center">Total</Table.Cell>
      </Table.Row>
      {graphData.map((item, i) => (
        <React.Fragment key={`${item.name}_${i}`}>{renderRow(item)}</React.Fragment>
      ))}
    </Table>
  );
};
