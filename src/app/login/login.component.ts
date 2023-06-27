import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../services/apiservice.service';
import { CommonserviceService } from '../services/commonservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: any='';
  password: any='';
  submitted:boolean=false;
  constructor(private http: HttpClient,private apiservice:ApiserviceService,private common:CommonserviceService, public router: Router,private toastr:ToastrService) {}

  login() {
    this.submitted=true;
    if(this.username !='' && this.password != ''){
      const loginData = {
        username: this.username,
        password: this.password
      };
  
      this.apiservice.post('user/login', loginData).subscribe((res:any)=>{
        if(res){
          localStorage.setItem("user", JSON.stringify(res.data));
          localStorage.setItem("token", JSON.stringify(res.data._id));
          this.common.token=res.data._id;
          this.submitted=false;
          this.toastr.success('Login  Successfully', 'Success');
          this.router.navigateByUrl('/dashboard');
        }
      },error => {
        this.toastr.success('Login  Failed', 'Error');
      });
    }else{
      return;
    }
  }


}
