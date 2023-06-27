import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../services/apiservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  submitted:boolean=false;
  name:any='';
  username: any='';
  password: any='';

  constructor(private http: HttpClient,private apiservice:ApiserviceService, public router: Router,private toastr:ToastrService) {
  }

  Signup() {
    this.submitted=true;
    if(this.name !='' && this.username != '' && this.password !=''){
      const signupData = {
        name:this.name,
        username: this.username,
        password: this.password,
        Wishlist:[]
      };
  
      this.apiservice.post('user/register', signupData).subscribe((res:any)=>{
        if(res){
          this.submitted=false;
          this.toastr.success('Sign Up Successfully', 'Success');
          this.router.navigateByUrl('/auth/login');
          
        }
      },error => {
        this.toastr.error('Signup Failed', 'Error');
      });
    }else{
      return;
    }
  }

}

