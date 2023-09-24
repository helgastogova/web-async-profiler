export type JsonDataType = {
  name: string;
  type: number;
  self: number;
  total: number;
  ch: JsonDataType[];
};

export type SortDirection = 'asc' | 'desc';
export type SortColumn = 'name' | 'type' | 'self' | 'total';
