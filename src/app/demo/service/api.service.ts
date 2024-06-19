import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseUrl = 'https://sys.techavo.in/backend/api';
  // baseUrl = 'https://iot.wrongcode.in/backend/api';
  // private baseUrl = 'https://192.168.169.10:8000/api';
 
  token:any;
    baseURL: any;
  constructor(private http: HttpClient){ }

  login(data: any): Observable<any> {
    const url = `${this.baseUrl}/auth/login`;
    return this.http.post(url, data);
  }
  showMsg(){

  }
}
