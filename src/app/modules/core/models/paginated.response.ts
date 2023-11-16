export interface PaginatedResponse<T> {
  items: T[],
  pageNumber: number,
  pageSize: number, 
  totalCount: number, 
  firstNum: number,
  rows: number,
}