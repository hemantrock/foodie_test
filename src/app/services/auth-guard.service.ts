import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CommonserviceService } from './commonservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: CommonserviceService,
    public router: Router
  ) {}
  canActivate(): boolean {
    if (!this.auth.getToken()) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    return true;
  }
}

