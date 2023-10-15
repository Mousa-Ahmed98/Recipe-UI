import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseShoppingItem, ShoppingItem } from '../../account/models/shopping_item.model';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private apiUrl = `${environment.apiUrl}/shopping`;
  
  constructor(private http: HttpClient) {}

  addShoppingItem(shoppingItem: ShoppingItem){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<ShoppingItem>(`${this.apiUrl}/addShopItem`, shoppingItem, httpOptions);
  }
  
  GetShoppingList(id:string): Observable<ResponseShoppingItem[]> {
    return this.http.get<ResponseShoppingItem[]>(this.apiUrl+"/GetAllItems/"+id);
  }
  
  toggleShopItem(item:ResponseShoppingItem): Observable<ResponseShoppingItem> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.put<ResponseShoppingItem>(`${this.apiUrl}/updateShopItem`, item, httpOptions);
  }
}