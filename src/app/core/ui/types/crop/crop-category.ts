import { CreateCropRequest } from "@core/types/crop/create-crop.request";
import { UpdateCropRequest } from "@core/types/crop/update-crop.request";
export interface CropFormPayload {
    data: CreateCropRequest | UpdateCropRequest;
    file: File | null;
    isEdit: boolean;
}