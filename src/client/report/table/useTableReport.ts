import { useEffect, useState } from 'react';
import { DataType, SortDirection, SortColumn } from '@client/report/types';
import { sortData } from '@client/report/utils';

type ToggleState = Record<string, boolean>;
type FilterState = Record<string, boolean>;

export const useTableReport = (data: DataType[]) => {
  const [graphData, setGraphData] = useState<DataType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [toggledNodes, setToggledNodes] = useState<ToggleState>({});
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [filterTypes, setFilterTypes] = useState<FilterState>({});

  useEffect(() => {
    const mainData = data[0];
    if (mainData) {
      setGraphData(mainData.ch ?? []);
      setTotal(mainData.total ?? 0);
    }
  }, [data]);

  const updateFilterTypes = (type: string, checked: boolean) => {
    setFilterTypes((prevState) => ({ ...prevState, [type]: checked }));
  };

  const toggleSort = (column: SortColumn) => {
    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
  };

  const filteredData = sortData(graphData, sortDirection, sortColumn).filter((item) => !filterTypes[item.type] ?? true);

  const toggleNode = (node: DataType) => {
    const updateToggledNodes = (currentNode: DataType, state: ToggleState) => {
      state[currentNode.name] = !state[currentNode.name];
      if (currentNode.ch?.length === 1) {
        updateToggledNodes(currentNode.ch[0], state);
      }
    };

    const newToggledNodes = { ...toggledNodes };
    updateToggledNodes(node, newToggledNodes);
    setToggledNodes(newToggledNodes);
  };

  const collapseAll = () =>
    setToggledNodes((prevState) => {
      const newState = { ...prevState };
      for (const key in newState) {
        newState[key] = false;
      }
      return newState;
    });

  const expandAll = () =>
    setToggledNodes((prevState) => {
      const newState = { ...prevState };
      for (const key in newState) {
        newState[key] = true;
      }
      return newState;
    });

  return {
    filteredData,
    total,
    toggledNodes,
    handleSort: toggleSort,
    handleToggle: toggleNode,
    collapseAll,
    expandAll,
    filterTypes,
    handleFilterTypeChange: updateFilterTypes,
  };
};
