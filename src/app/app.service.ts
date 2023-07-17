import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient ) { }

  sendOrder(data: Partial<Order>): Observable<Object> {
    return this.http.post('https://testologia.site/burgers-order', data);
  }

  getData(): Observable<any> {
    return this.http.get('https://testologia.site/burgers-data?extra=black')
  }
}
