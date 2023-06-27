import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiserviceService } from '../services/apiservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit{
  submitted:boolean=false;
  edit!:FormGroup;
  data:any;
  title:any='';
  ingredients: any='';
  instructions: any='';
  image: any='';
  selectedFile!: File ;
  constructor(private http: HttpClient,private apiservice:ApiserviceService, public router: Router,private toastr:ToastrService, private fb: FormBuilder) {
    const pdata=localStorage.getItem('edit_p')
    if(pdata != null){
      this.data=JSON.parse(pdata)      
    }
    console.log("data recieved",this.data)
  }

ngOnInit() {
  this.edit = this.fb.group({
    title: ['', Validators.required],
    ingredients: ['', Validators.required],
    instructions: ['', Validators.required],
    image: [''],
  })
  if(this.data != null){
    this.edit.patchValue({
      title: this.data.title,
      ingredients: this.data.ingredients,
      instructions: this.data.instructions,
      image: this.data.image,
    })
  }else{

  }
}  

  onFileChanged1(event:any) {
    this.selectedFile = event.target.files[0];
  }

  get ab (){return this.edit.controls} 

  Edit() {
    this.submitted=true;
    if(this.edit.valid){
      const formdata=this.edit.value;
      const uploadData = new FormData();
      if (this.selectedFile == null) {
        uploadData.append('image', '');
      } else {
        uploadData.append('image', this.selectedFile, this.selectedFile.name);
      }

      uploadData.append('title', formdata.title);
      uploadData.append('ingredients', formdata.ingredients);
      uploadData.append('instructions', formdata.instructions);
  
      this.apiservice.postRequest('recipe/upload/'+this.data._id, uploadData).subscribe((res:any)=>{
        if(res){
          this.submitted=false;
          this.toastr.success('Updated Successfully', 'Success');
          this.router.navigateByUrl('/dashboard');
        }
      },error => {
        this.toastr.error('Not Updated ', 'Error');
      });
    }else{
      return;
    }
  }

}


