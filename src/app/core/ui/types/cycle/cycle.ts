export interface Cycle {
    id: number,
    label: string,
    description: string,
    color: string,
    angle: number,
    metrics?: {
      label: string;
      value: string;
    }[];
}