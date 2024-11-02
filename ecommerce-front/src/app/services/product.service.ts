import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-categories';

  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId/${theCategoryId}`;
  
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response.content)  // Extract the products array from `content`
    );
  }


  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);
  }

  /**
   * console.log('getProductList() called');
    
    return this.httpClient.get<Product[]>(this.baseUrl);
   */
  


}
interface GetResponseProducts {
  content: Product[];       // List of products
  totalElements: number;    // Total number of elements
  totalPages: number;       // Total number of pages
  size: number;             // Page size
  number: number;           // Current page number
}

interface GetResponseProductCategory {

    productCategory: ProductCategory[];
  
}