import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../services/apiservice.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {
  submitted:boolean=false;
  title:any='';
  ingredients: any='';
  instructions: any='';
  image: any='';
  selectedFile!: File ;
  constructor(private http: HttpClient,private apiservice:ApiserviceService, public router: Router,private toastr:ToastrService) {
  }

  onFileChanged1(event:any) {
    this.selectedFile = event.target.files[0];
  }


  Add() {
    this.submitted=true;
    if(this.title !='' && this.ingredients != '' && this.instructions !=''){
      const uploadData = new FormData();
      if (this.selectedFile == null) {
        uploadData.append('image', '');
      } else {
        uploadData.append('image', this.selectedFile, this.selectedFile.name);
      }

      uploadData.append('title', this.title);
      uploadData.append('ingredients', this.ingredients);
      uploadData.append('instructions', this.instructions);
  
      this.apiservice.postRequest('recipe/add', uploadData).subscribe((res:any)=>{
        if(res){
          this.submitted=false;
          this.toastr.success('Added Successfully', 'Success');
          this.router.navigateByUrl('/dashboard');
        }
      },error => {
        this.toastr.error('Not Added ', 'Error');
      });
    }else{
      return;
    }
  }

}

