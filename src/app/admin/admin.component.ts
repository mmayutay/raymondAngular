import { Component, OnInit } from '@angular/core';
import { Admin } from './adminModel';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public array: any
  public admin = new Admin
  public submit : boolean=true;
  public cancel : boolean=false;

  constructor(private http: RequestService, private route: Router) { }

  ngOnInit() {
    this.http.showAllPosts().subscribe(data => {
      console.log(data)
      this.array = data
    })
  }

  onSubmit(){
    this.http.addAdmin(this.admin).subscribe(data => {
      console.log(data)
    })
  }

  onCancel(){
    this.submit=true;
    this.cancel=false
  }
  // addAdmin(){
  //   this.route.navigate(['/secadmin'])
  // }
  deletePost(title, index){
    this.http.deletePost(title).subscribe(data => {
      console.log(data)
    })
    this.array.splice(index, 1)
  }
  logout(){
    Swal.fire({
      title: 'What?',
      text: "Are you sure you want to Log-out?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.route.navigate(['/'])
      }
    })
  }


}