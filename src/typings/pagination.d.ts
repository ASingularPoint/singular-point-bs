// ***** pagination ******
interface IPagination {
  currentPage: number;
  pageSize: number;
  pageSizes: number[];
  total: number;
  small?: boolean;
  background?: boolean;
  disabled?: boolean;
}
