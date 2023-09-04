import React, { useEffect, useState } from "react";
import { Table } from "@ui";
import { types } from "./constants.ts";

type DataType = {
  name: string;
  type: number;
  self: number;
  total: number;
  ch?: DataType[];
};

type ToggleState = { [key: string]: boolean };

const FrameGraph: React.FC<{ data: DataType }> = ({ data }) => {
  const [graphData, setGraphData] = useState<DataType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [toggledNodes, setToggledNodes] = useState<ToggleState>({});

  useEffect(() => {
    if (data) {
      setGraphData([data]);
      setTotal(data.total);
    }
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
        {
          <Table.Row key={name}>
            <Table.Cell style={{ paddingLeft: `${level * 20}px` }}>
              {ch && (
                <button onClick={() => handleToggle(name)}>
                  {isToggled ? "–" : "+"}
                </button>
              )}{" "}
              {name}
            </Table.Cell>
            <Table.Cell align="center">{types[type]}</Table.Cell>
            <Table.Cell align="center">{self}</Table.Cell>
            <Table.Cell align="center">{total}</Table.Cell>
          </Table.Row>
        }
        {isToggled &&
          ch?.map((child, index) => (
            <React.Fragment key={index}>
              {renderRow(child, level + 1)}
            </React.Fragment>
          ))}
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
      {graphData.map((rootNode, index) => (
        <React.Fragment key={index}>{renderRow(rootNode)}</React.Fragment>
      ))}
    </Table>
  );
};

export default FrameGraph;
