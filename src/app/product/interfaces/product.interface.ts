import { ProductStatus } from "../enums/product-status.enum";
import { ProductionType } from "../enums/production-type.enum";

export interface Product {
  name: string;
  productionType: ProductionType;
  status: ProductStatus;
}
