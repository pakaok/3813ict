import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupAdComponent } from './group-ad/group-ad.component';
import { GroupAssisComponent } from './group-assis/group-assis.component';
import { LoginComponent } from './login/login.component';
import { SupAdComponent } from './sup-ad/sup-ad.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [{path:'',redirectTo:'/login',pathMatch:'full'},
{path:'login',component:LoginComponent},
{path:'supad',component:SupAdComponent},
{path:'groupad',component:GroupAdComponent},
{path:'groupassis',component:GroupAssisComponent},
{path:'users',component:UsersComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
