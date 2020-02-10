import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public hide = false
  public userArray: any
  public username: String
  public whoPost: String
  public sub: any

  constructor(private http: RequestService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.whoPost = params.name
      this.username = params.user
    })
    this.http.userDataWhoPost(this.whoPost).subscribe(data => {
      this.userArray = data
    })
  }

  navbar(boolean){
    if(!boolean){
      this.hide = false
    }else{
      this.hide = true
    }
  }
  backHome(){
    this.router.navigate(['/home/'+this.username])
  }
  editProfile(){
    this.router.navigate(['/editprofile/'+this.username])
  }
}
