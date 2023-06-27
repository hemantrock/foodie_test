import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../services/apiservice.service';
import { Router } from '@angular/router';
import { CommonserviceService } from '../services/commonservice.service';
import { WishlistService } from '../services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  showop:boolean=false;
  showop1:boolean=false;
  user:any;
  wishlistItems: string[] = [];
  constructor(
    public common:CommonserviceService,
    public service:ApiserviceService, 
    public router: Router,
    private wishlistService: WishlistService,
    private toaster:ToastrService
  ){ 
    const data=localStorage.getItem('user');
    if(data != null){
      this.user=JSON.parse(data);
    }
   }

  ngOnInit(){
    // this.wishlistItems = this.user.Wishlist;
    this.wishlistItems = this.wishlistService.getWishlistItems();
    
  }

  removeFromWishlist(item: string): void {
    this.wishlistService.removeFromWishlist(item);
    this.wishlistItems = this.wishlistService.getWishlistItems();
    this.toaster.success("Recipe Removed from Wish list")
  }

  Logout(){
        localStorage.clear();
        this.common.token=null;
        this.toaster.success("User Log Out Successfully")
        this.router.navigateByUrl("auth/login");
  }

}
