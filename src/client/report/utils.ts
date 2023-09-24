import { JsonDataType, SortDirection, SortColumn } from './types';

export const sortData = (
  graphData: JsonDataType,
  sortDirection: SortDirection = 'desc',
  sortColumn: SortColumn = 'total',
): JsonDataType =>
  graphData
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
