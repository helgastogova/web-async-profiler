import React, { useEffect, useState } from 'react';
import { Table, Loader } from '@ui';
import { useData } from '@client/report/useData';
import { languages } from './constants';

import s from './table.module.css';

type DataType = {
  name: string;
  type: number;
  self: number;
  total: number;
  ch?: DataType[];
};

type ToggleState = { [key: string]: boolean };

export const TableReport: React.FC<{ data: DataType }> = () => {
  const { data, loading, error } = useData();
  const [graphData, setGraphData] = useState<DataType[]>([]);
  const [toggledNodes, setToggledNodes] = useState<ToggleState>({});

  useEffect(() => {
    if (data) setGraphData(data[0]?.ch);
  }, [data]);

  console.log(graphData);

  const handleToggle = (node: DataType) => {
    const newToggledNodes: ToggleState = { ...toggledNodes };

    const toggleRecursively = (currentNode: DataType) => {
      const { name, ch } = currentNode;

      if (ch?.length === 1) {
        newToggledNodes[name] = true;
        toggleRecursively(ch[0]);
      } else {
        newToggledNodes[name] = !newToggledNodes[name];
      }
    };

    toggleRecursively(node);
    setToggledNodes(newToggledNodes);
  };

  if (loading) return <Loader className={s.loader} />;
  if (error) return <p>Error: {error}</p>;

  if (!graphData) return null;

  const renderRow = (node: DataType, level = 0) => {
    const { name, type, self, total, ch } = node;
    const isToggled = toggledNodes[name];

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
