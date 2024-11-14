export interface ProductResponse {
  data: DataProduct[];
}

export interface DataProduct {
  id:             number;
  name:           string;
  productionType: string;
  status:         string;
}
