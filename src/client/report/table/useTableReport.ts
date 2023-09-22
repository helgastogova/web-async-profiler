import { useEffect, useState } from 'react';
import { DataType } from '@client/report/types';

type ToggleState = { [key: string]: boolean };
type SortDirection = 'asc' | 'desc';
type SortColumn = 'name' | 'type' | 'self' | 'total';

export const useTableReport = (data: DataType[]) => {
  const [graphData, setGraphData] = useState<DataType[]>([]);
  const [toggledNodes, setToggledNodes] = useState<ToggleState>({});
  const [sortColumn, setSortColumn] = useState<SortColumn>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    if (data) setGraphData(data[0]?.ch);
  }, [data]);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedGraphData = graphData
    ? [...graphData].sort((a, b) => {
        return sortDirection === 'asc'
          ? a[sortColumn] > b[sortColumn]
            ? 1
            : -1
          : a[sortColumn] < b[sortColumn]
          ? 1
          : -1;
      })
    : [];

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
    sortedGraphData,
    toggledNodes,
    handleSort,
    handleToggle,
    collapseAll,
    expandAll,
  };
};
