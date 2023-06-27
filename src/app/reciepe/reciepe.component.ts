import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../services/wishlist.service';
declare var $: any;


@Component({
  selector: 'app-reciepe',
  templateUrl: './reciepe.component.html',
  styleUrls: ['./reciepe.component.css']
})
export class ReciepeComponent implements OnInit{
  filterdir:boolean=false;
  imgurl:any=environment.imageurl;
  sortedList!: any[];
  data:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Title', 'Ingredients', 'Instructions','Action']; 
  @ViewChild(MatSort) sort!: MatSort;
  // data: any;
  userdata:any;
  constructor(
    private fb: FormBuilder,
    public sharedService: ApiserviceService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr:ToastrService,
    private wishlistService: WishlistService
  ){
    const token = localStorage.getItem("user");
    // Check if the token is null
    if (token !== null) {
      this.userdata = JSON.parse(token);
    } else {
      // Handle the case when the token is null
      console.log('Token not found in localStorage');
    }
  }
  ngOnInit() {
    this.List();
  }  

  addToWishlist(name:any): void {
    console.log("this.wishlistService.wishlistItems",this.wishlistService.wishlistItems)
    if((this.wishlistService.wishlistItems).includes(name)){
      this.toastr.warning("Recipe Already Added to Wishlist");  
    }else{
      this.wishlistService.addToWishlist(name);
      this.toastr.success("Recipe Added to Wishlist");
      console.log("name",name)
      this.addtowishlist(name)
    }
  }

  addtowishlist(id:any){
    this.userdata.Wishlist.push(id)
    const data={
      name:this.userdata.name,
      username:this.userdata.username,
      Wishlist:this.userdata.Wishlist,
    }
    this.sharedService.post('user/update/'+this.userdata._id,data).subscribe((res:any) => {
      if((res.data).length != 0 ){
        localStorage.setItem('user',JSON.stringify({
          _id:this.userdata._id,
          name:this.userdata.name,
          username:this.userdata.username,
          Wishlist:this.userdata.Wishlist,
        }))
      }else{
        console.log("No Data Found",res.data)
      }
    }, err => { return    });
  }

  List() {
    this.sharedService.get('recipe/').subscribe((res:any) => {
      if((res.data).length != 0 ){

        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        // console.log("data",res.data)
        this.data=res.data;
      }else{
        console.log("No Data Found",res.data)
      }
    }, err => {console.log(err.error)

    });
  }

  filter(type:any) {
    console.log("type",type)
    this.sharedService.get('recipe/filter/'+type+'/'+this.filterdir).subscribe((res:any) => {
      if((res.data).length != 0 ){
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        // console.log("data",res.data)
        this.data=res.data;
      }else{
        console.log("No Data Found",res.data)
      }
    }, err => {console.log(err.error)

    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(data:any){
    localStorage.setItem("edit_p",JSON.stringify(data));
    this.router.navigateByUrl("/editRecipe")
  }
}
