// item interface to standardise API response
export interface Item {
  title: string;
  date: string;
  distance: number;
  venue: string;
  lat: number;
  long: number;
  type: string;
  marker: string;
  url?: string;
}
