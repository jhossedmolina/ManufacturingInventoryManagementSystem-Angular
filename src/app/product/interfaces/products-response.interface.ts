export interface ProductsResponse {
  data: DataProducts[];
}

export interface DataProducts {
  id:             number;
  name:           string;
  productionType: string;
  status:         string;
}
