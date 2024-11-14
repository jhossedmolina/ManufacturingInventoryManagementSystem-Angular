import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { DataProducts, ProductsResponse } from '../interfaces/products-response.interface';
import { DataProduct, ProductResponse } from '../interfaces/product-response.interface';
import { ProductionType } from '../enums/production-type.enum';
import { ProductStatus } from '../enums/product-status.enum';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl: string = environment.apiUrl;
  private http = inject( HttpClient );

  constructor() { }

  allProducts(): Observable<DataProducts[]>{
    const url = `${ this.baseUrl }/Product/GetAllProducts`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    return this.http.get<ProductsResponse>(url, { headers }).pipe(
      map((response: ProductsResponse) => response.data)
    );
  };

  productById(productId: number): Observable<DataProduct>{
    const url = `${ this.baseUrl }/Product/GetProductById/${productId}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    return this.http.get<ProductResponse>(url, { headers }).pipe(
      map((response: ProductResponse) => {
        const data = response.data;
        return {
          ...data,
        productionType: ProductionType[data.productionType.toString().replace(/ /g, '_') as keyof typeof ProductionType],
        status: ProductStatus[data.status.toString().replace(/ /g, '_') as keyof typeof ProductStatus]
      } as DataProduct;
      })
    );
  };

  addNewProduct( product: Product ): Observable<boolean>{
    const url = `${ this.baseUrl }/Product/AddProduct`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(product.status)
    console.log(product.productionType)

    return this.http.post<boolean>(url, product, { headers })
      .pipe(
        map( ()  => true),

        catchError(err => {
        return throwError( () => console.log(err))
      })
    );
  };

  updateProduct(productId: number, product: Product): Observable<boolean> {
    const url = `${this.baseUrl}/Product/UpdateProduct?id=${productId}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<boolean>(url, product, { headers })
      .pipe(
        map( ()  => true),

        catchError(err => {
          return throwError( () => console.log(err))
        })
      );
  };

  markProductAsDefective(productId: number): Observable<boolean>{
    const url = `${this.baseUrl}/Product/MarkProductAsDefective?id=${productId}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<boolean>(url, null, { headers })
      .pipe(
        map( ()  => true),

        catchError(err => {
          return throwError( () => console.log(err))
        })
      );
  };

  deleteProduct(productId: number): Observable<boolean>{
    const url = `${this.baseUrl}/Product/DeleteProduct/${productId}`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<boolean>(url, { headers })
      .pipe(
        map( ()  => true),

        catchError(err => {
        return throwError( () => console.log(err))
      })
    );
  };
}
