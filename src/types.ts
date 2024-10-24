export interface Package {
  name: string;
  minPax: number;
  maxPax: number;
  price: number;
}

export interface Event {
  date: string;
  packages: Package[];
  bookedPax: number;
}