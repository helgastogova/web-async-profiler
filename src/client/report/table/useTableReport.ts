import { useEffect, useState } from 'react';
import { DataType, SortDirection, SortColumn } from '@client/report/types';
import { sortData } from '@client/report/utils';

type ToggleState = { [key: string]: boolean };

export const useTableReport = (data: DataType[]) => {
  const [graphData, setGraphData] = useState<DataType[]>([]);
  const [total, setTotal] = useState<number>(0);

  const [toggledNodes, setToggledNodes] = useState<ToggleState>({});

  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const [filterTypes, setFilterTypes] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (data) {
      setGraphData(data[0]?.ch);
      setTotal(data[0]?.total);
    }
  }, [data]);

  const handleFilterTypeChange = (type: string, checked: boolean) => {
    setFilterTypes({
      ...filterTypes,
      [type]: checked,
    });
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const filteredData = sortData(graphData, sortDirection, sortColumn).filter((item) =>
    Object.keys(filterTypes).length === 0 ? true : filterTypes[item.type],
  );

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

  const collapseAll = () => {
    console.log('collapseAll');
    const newToggledNodes: ToggleState = {};
    Object.keys(toggledNodes).forEach((key) => {
      newToggledNodes[key] = false;
    });
    setToggledNodes({ ...newToggledNodes });
  };

  const expandAll = () => {
    console.log('expandAll');
    const newToggledNodes: ToggleState = {};
    Object.keys(toggledNodes).forEach((key) => {
      newToggledNodes[key] = true;
    });
    setToggledNodes({ ...newToggledNodes });
  };

  return {
    filteredData,
    total,
    toggledNodes,
    handleSort,
    handleToggle,
    collapseAll,
    expandAll,
    filterTypes,
    handleFilterTypeChange,
  };
};
