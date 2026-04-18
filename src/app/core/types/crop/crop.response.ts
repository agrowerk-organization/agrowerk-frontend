export interface CropResponse {
    id: string;
    name: string;
    scientificName: string;
    growthCycleDays: number;
    cropCategory: string;
    createdAt: string;
    updatedAt: string;
    originalUrl?: string;
    mediumUrl?: string;
    thumbnailUrl?: string;
}
