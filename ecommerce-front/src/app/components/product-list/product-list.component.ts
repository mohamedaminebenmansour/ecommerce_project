import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyword: string = "";

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("ngOnInit called");
    this.route.paramMap.subscribe(() => {
      console.log("Route parameters changed");
      this.listProducts();
    });
  }

  listProducts() {
    console.log("listProducts called");

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    console.log(`Search mode: ${this.searchMode}`);

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    console.log("handleSearchProducts called");

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    console.log(`Search keyword: ${theKeyword}`);

    // if we have a different keyword than previous
    // then set thePageNumber to 1
    if (this.previousKeyword !== theKeyword) {
      console.log("New keyword detected, resetting page number to 1");
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`Searching for products with keyword="${theKeyword}", thePageNumber=${this.thePageNumber}`);

    // now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1, this.thePageSize, theKeyword)
      .subscribe(this.processResult());
  }

  handleListProducts() {
    console.log("handleListProducts called");

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log(`Has category ID: ${hasCategoryId}`);

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      this.currentCategoryId = 1;
    }

    console.log(`Current category ID: ${this.currentCategoryId}`);

    // Check if we have a different category than previous
    if (this.previousCategoryId !== this.currentCategoryId) {
      console.log("New category detected, resetting page number to 1");
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`Retrieving products for category=${this.currentCategoryId}, page=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId)
      .subscribe(this.processResult());
  }

  updatePageSize(pageSize: string) {
    console.log(`Updating page size to ${pageSize}`);
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
        console.log("processResult called with data:", data);
        
        // Adjusting to match the structure of GetResponseProducts
        this.products = data.content;
        this.thePageNumber = data.number + 1;
        this.thePageSize = data.size;
        this.theTotalElements = data.totalElements;

        console.log("Processed pagination info:", {
          pageNumber: this.thePageNumber,
          pageSize: this.thePageSize,
          totalElements: this.theTotalElements
        });
      };
  }
  addToCart(theProduct: Product) {
    
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    // TODO ... do the real work
    
  }

}
