export interface Status {
  label: string;
  color: string;
  index: number;
}
export const ORDER_STATUS_MAP: Status[] = [
  { label: 'Pending', color: 'primary', index: 0 },
  { label: 'Processed', color: 'warning', index: 1 },
  { label: 'Shipped', color: 'warning', index: 2 },
  { label: 'Delivered', color: 'success', index: 3 },
  { label: 'Failed', color: 'danger', index: 4 },
];
