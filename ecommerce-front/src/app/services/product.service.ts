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
    const searchUrl = `${this.baseUrl}/search/findByCategoryId/${theCategoryId}`;
  
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response.content)  // Extract the products array from `content`
    );
  }
  


}
interface GetResponseProducts {
  content: Product[];       // List of products
  totalElements: number;    // Total number of elements
  totalPages: number;       // Total number of pages
  size: number;             // Page size
  number: number;           // Current page number
}
