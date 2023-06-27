import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice.service';
import { Router } from '@angular/router';
import { CommonserviceService } from '../services/commonservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  constructor(public common:CommonserviceService,public service:ApiserviceService, public router: Router){  }

  ngOnInit(){

  }

  Logout(){
        localStorage.clear();
        this.common.token=null;
        this.router.navigateByUrl("auth/login");
  }

}
