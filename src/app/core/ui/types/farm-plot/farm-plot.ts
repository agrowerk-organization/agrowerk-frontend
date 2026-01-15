import { CropIcon } from "../crop-icon.ts/crop-icon";

export interface FarmPlot {
    id: number,
    name: string,
    icon: CropIcon,
    color: string,
    delay: string
}