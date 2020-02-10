import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { LoginComponent } from '@src/app/login/login.component.tns';
import { RegisterComponent } from '@src/app/register/register.component.tns';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auto-generated',
    pathMatch: 'full',
  },
  {
    path: 'auto-generated',
    component: LoginComponent,
  },
  { path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes),
  ],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
