import { ProductStatus } from "../enums/product-status.enum";
import { ProductionType } from "../enums/production-type.enum";

export interface ProductResponse {
  data: DataProduct;
}

export interface DataProduct {
  id:             number;
  name:           string;
  productionType: ProductionType;
  status:         ProductStatus;
}
