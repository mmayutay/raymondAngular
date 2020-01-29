import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';
import { ViewComponent } from './view/view.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { AdminComponent } from './admin/admin.component';

const Routes: Routes = [
  { path: 'home/:name', component: HomeComponent },
  { path: '', component: LoginComponent },
  { path: 'post/:name', component: PostComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'postdetails/:name', component: ViewComponent },
  { path: 'dashboard/accept/:name/:from', component: DashboardComponent},
  { path: 'error', component: ErrorComponent},
  { path: '**', component: ErrorComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PostComponent,
    RegisterComponent,
    ViewComponent,
    DashboardComponent, 
    ErrorComponent, 
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
