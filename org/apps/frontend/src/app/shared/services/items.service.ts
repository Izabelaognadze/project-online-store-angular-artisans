import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private url = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(`${this.url}`);
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }

  public addProduct(product: Product) {
    product.id = uuidv4();
    return this.http.post<Product>(this.url, product);
  }

  public updateProduct(product: Product) {
    return this.http.put<Product>(`${this.url}/${product.id}`, product);
  }

  public deleteProduct(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  public findProductByName(name: string) {
    return this.http.get<Product[]>(this.url, {
      params: new HttpParams().set('name_like', name),
    });
  }

  public findProductByStatus(status: string) {
    return this.http.get<Product[]>(this.url, {
      params: new HttpParams().set('status_like', status),
    });
  }

  public findProductByCategory(category: string) {
    return this.http.get<Product[]>(this.url, {
      params: new HttpParams().set('category_like', category),
    });
  }

  public findProductBySeler(seler: string) {
    return this.http.get<Product[]>(this.url, {
      params: new HttpParams().set('seler_like', seler),
    });
  }

  public findProductByPrice(price: string) {
    return this.http.get<Product[]>(this.url, {
      params: new HttpParams().set('price_like', price),
    });
  }
}
