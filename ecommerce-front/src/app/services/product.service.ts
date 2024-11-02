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

  getProduct(theProductId: number): Observable<Product> {

    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }
  
  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId/${theCategoryId}`;
  
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response.content)  // Extract the products array from `content`
    );
  }


  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<ProductCategory[]>(this.categoryUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // Build the URL based on the keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining/${theKeyword}`;
    
    // Log the constructed URL to verify it is correct
    console.log('Constructed Search URL:', searchUrl);
  
    // Call the method to retrieve products
    return this.getProducts(searchUrl);
  }
  
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => {
        // Log the full response to see what data is being returned
        console.log('HTTP Response:', response);
  
        // Extract and log the content (array of products) from the response
        console.log('Extracted Products:', response.content);
  
        // Return the products array
        return response.content;
      })
    );
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