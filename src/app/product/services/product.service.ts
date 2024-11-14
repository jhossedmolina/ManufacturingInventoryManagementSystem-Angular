import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataProduct, ProductResponse } from '../interfaces/product-response.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl: string = environment.apiUrl;
  private http = inject( HttpClient );

  constructor() { }

  allProducts(): Observable<DataProduct[]>{
    const url = `${ this.baseUrl }/Product/GetAllProducts`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${ token }`);

    return this.http.get<ProductResponse>(url, { headers }).pipe(
      map((response: ProductResponse) => response.data)
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
  }
}
