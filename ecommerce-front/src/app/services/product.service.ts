import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {
    // ! need to build url based on category id
    console.log('getProductList() called');
    
    return this.httpClient.get<Product[]>(this.baseUrl);
}

}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}