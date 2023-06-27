import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ReciepeComponent } from './reciepe/reciepe.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

const routes: Routes  = [
  {
    path: 'auth/login',
    component:LoginComponent
  },
  {
    path: 'auth/signup',
    component:SignupComponent
  },
  {
    path: 'dashboard',
    component:ReciepeComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'add-recipe',
    component:AddRecipeComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'editRecipe',
    component:EditRecipeComponent,
    // canActivate: [AuthGuardService],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
		useHash: false,
		enableTracing: false,
 
		preloadingStrategy: PreloadAllModules
	})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
