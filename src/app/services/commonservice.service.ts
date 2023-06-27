import { Injectable } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {
  token:any= localStorage.getItem("token")
  constructor(private router: Router, private http: ApiserviceService) {
   }

}
