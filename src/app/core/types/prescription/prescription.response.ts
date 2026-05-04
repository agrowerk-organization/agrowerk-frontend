import { PrescriptionItemResponse } from "./prescription-item.response";

export interface PrescriptionResponse {
    id:              string;
    plantingId:      string;
    cropName:        string;
    fieldName:       string;
    propertyName:    string;
    agronomistName:  string;
    agronomistCrea:  string;
    issuedAt:        string;
    validUntil:      string;
    documentUrl:     string;
    active:          boolean;
    expired:         boolean;
    items:           PrescriptionItemResponse[];
    createdAt:       string;
}
  