import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SupAdComponent } from './sup-ad/sup-ad.component';

const routes: Routes = [{path:'',redirectTo:'/login',pathMatch:'full'},
{path:'login',component:LoginComponent},
{path:'supad',component:SupAdComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
