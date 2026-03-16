export interface Cycle {
    id: number,
    label: string,
    description: string,
    color: string,
    angle: number,
    route?: string,
    metrics?: {
      label: string;
      value: string;
    }[];
}