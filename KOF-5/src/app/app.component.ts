import { Component } from '@angular/core';

import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KOF-5';

  products: Product[]
  selectedProduct: Product

  constructor() {
    this.products = []
    this.selectedProduct = new Product()
    this.getAllProducts()
  }


  public async getAllProducts() {
    const data = await (await fetch('https://dummyjson.com/products/?limit=100')).json()
    console.log(data)
    data.products.map((x: any) => {
      let p = new Product()
      p.id = x.id
      p.title = x.title
      p.description = x.description
      p.price = x.price
      p.discountPercentage = x.discountPercentage
      p.rating = x.rating
      p.stock = x.stock
      p.brand = x.brand
      p.category = x.category
      p.thumbnail = x.thumbnail
      p.images = x.images
      this.products.push(p)
    })
  }


  public async deleteProduct(product: Product) {
    const data = await (await fetch('https://dummyjson.com/products/' + product.id)).json()
    console.log(data)
    let i = this.products.findIndex(x => x.id === product.id)
    this.products.splice(i, 1)
  }


  public select(product: Product) {
    this.selectedProduct = product
  }


  public close() {
    this.selectedProduct = new Product()
  }


  public colorType(product: Product) {
    let colorClass = ''
    if (product.stock <= 50) {
      colorClass = 'table-danger'
    }
    else if (product.stock <= 100) {
      colorClass = 'table-warning'
    }
    else {
      colorClass = 'table-success'
    }
    return colorClass
  }

  public countCategory() {
    let s = ''
    let categories: string[] = []
    let counts: number[] = []
    for (let i = 0; i < this.products.length; i++) {
      let has = false
      for (let x = 0; x < categories.length; x++) {
        if (this.products[i].category === categories[x]) {
          counts[x] += 1
          has = true
          break
        }
      }
      if (has == false) {
        categories.push(this.products[i].category)
        counts.push(1)
      }
    }
    for (let i = 0; i < categories.length; i++) {
      s += categories[i] + ' ' + counts[i] + '\n'
    }
    alert(s)
  }


  public maxDiscount() {
    let max = 0
    for (let i = 0; i < this.products.length; i++) {
      if (max < this.products[i].discountPercentage) {
        max = this.products[i].discountPercentage
      }
    }
    alert(max)
  }


  public priceLevel() {
    let s = ''
    let avg = 0
    let ps: Product[] = []
    for (let i = 0; i < this.products.length; i++) {
      avg += this.products[i].price
    }
    avg /= this.products.length
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].price > avg) {
        ps.push(this.products[i])
      }
    }
    for (let i = 0; i < ps.length; i++) {
      s += ps[i].id + ' ' + ps[i].title + '\n'
    }
    alert(s)
  }
}
