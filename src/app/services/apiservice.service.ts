import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpClientModule, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from 'src/environments/environment';
var baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  public auth_token: any;
  public serviceBase: any;
  user: any;

  constructor(private router: Router, private http: HttpClient) { 
    this.serviceBase = baseUrl;
  }

  get(url: any): Observable<any> {
    if (this.auth_token) {
      let headers = new HttpHeaders({ 'Authorization': "Bearer " + this.auth_token, 'Content-Type': 'application/json' });
      return this.http.get(this.serviceBase + url, {
        headers: headers
      });
    } else {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get(this.serviceBase + url, {
        headers: headers
      });
    }
  }

  postRequest(url:any, data:any) {
    if (this.auth_token) {
      let headers = new HttpHeaders({ 'Authorization': "Bearer " + this.auth_token });
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      return this.http.post(this.serviceBase + url, data, { headers: headers });
    } else {
      let headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      return this.http.post(this.serviceBase + url, data, { headers: headers });
    }

  }

  post(url: any, data: any): Observable<any> {
    if (this.auth_token) {
      let headers = new HttpHeaders({ 'Authorization': "Bearer " + this.auth_token, 'Content-Type': 'application/json' });
      return this.http.post(this.serviceBase + url, data, {
        headers: headers
      });
    } else {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(this.serviceBase + url, data, {
        headers: headers
      });
    }
  }
  patch(url: any, data: any): Observable<any> {
    if (this.auth_token) {
      let headers = new HttpHeaders({ 'Authorization': "Bearer " + this.auth_token, 'Content-Type': 'application/json' });
      return this.http.patch(this.serviceBase + url, data, {
        headers: headers
      });
    } else {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.patch(this.serviceBase + url, data, {
        headers: headers
      });
    }
  }
  put(url: any, data: any): Observable<any> {
    if (this.auth_token) {
      let headers = new HttpHeaders({ 'Authorization': "Bearer " + this.auth_token, 'Content-Type': 'application/json' });
      return this.http.put(this.serviceBase + url, data, {
        headers: headers
      });
    } else {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.put(this.serviceBase + url, data, {
        headers: headers
      });
    }
  }

  goTo(page: any) {
    this.router.navigate([page]);
  }
}
