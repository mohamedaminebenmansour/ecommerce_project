import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  //templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number=1;
  
  constructor(private productService: ProductService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.listProducts();
    this.route.paramMap.subscribe(()=>
    {
      this.listProducts();
    }
    );
  }

  listProducts() {
    //check if 'id' parameter is available
    const hasCategoryId: boolean =this.route.snapshot.paramMap.has('id')
    if(hasCategoryId){
      //get the "id" param string, convert to number
      this.currentCategoryId = +(this.route.snapshot.paramMap.get('id')||1);
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
        console.log(this.products);
      }
    )
  }

}
