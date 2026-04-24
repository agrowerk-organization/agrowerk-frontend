import { AssetCategory } from "@core/enums/asset-category";
import { AssetCondition } from "@core/enums/asset-condition";
import { AssetValuationMethod } from "@core/enums/asset-valuation-method";

export interface CreateInventoryAssetRequest {
    name: string;
    description: string;
    category: AssetCategory;
    condition: AssetCondition;
    quantity: number;
    referenceValue: number;
    unit: string;
    propertyId: string;
    valuationMethod: AssetValuationMethod;
    agreedValue: number;
    commodityReference: string;
    commodityQuantityEquivalent: number;
}