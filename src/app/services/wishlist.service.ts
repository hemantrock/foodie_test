import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  public wishlistItems: string[] = [];

  addToWishlist(item: string): void {
    this.wishlistItems.push(item);
  }

  removeFromWishlist(item: string): void {
    const newArray = (this.wishlistItems).filter(i => i !== item);
    // const index = this.wishlistItems.indexOf(item);
    // if (index !== -1) {
    //   this.wishlistItems.splice(index, 1);
    // }
    this.wishlistItems=newArray;
    const data=localStorage.getItem('user');
    let user:any;
    if(data != null){
      user=JSON.parse(data);
      user.Wishlist=this.wishlistItems;
      localStorage.setItem('user',JSON.stringify(user))
    }

  }

  getWishlistItems(): string[] {
    const data=localStorage.getItem('user');
    let user:any;
    if(data != null){
      user=JSON.parse(data);
      this.wishlistItems=user.Wishlist
    }
    return this.wishlistItems;
  }
}
