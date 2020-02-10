import { Component, OnInit } from "@angular/core";
import { RequestService } from '../request.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public userInfo = ["Show Profile", "Logout"]
  public logoutAndProf = false
  public arrayOfUsers: any;
  public click: boolean = true;
  public unclick: boolean = false;
  public arrayOfPost: any;
  count = 0;
  public name: String;
  public sub: any
  public userDetails: any

  constructor(
    private http: RequestService,
    private route: ActivatedRoute,
    private router: Router
    ) {}

  ngOnInit() {
    this.http.showAllPosts().subscribe(data => {
      this.arrayOfPost = data
    })
    this.sub = this.route.params.subscribe(params => {
      this.name = params.name
    })
    this.http.userDataWhoPost(this.name).subscribe(data => {
      this.arrayOfUsers = data
    })
    console.log(this.name)
    
  }
  showDetails(value) {
    this.router.navigate(['/postdetails/'+this.name+'/'+value._id])
  }

  onExit() {
    this.click = true;
    this.unclick = false;
  }
  makeAPost() {
    this.router.navigate(['/post/'+this.name])
  }
  acceptOffer(user, index){
    this.http.acceptOffer(user.username, this.name).subscribe(data => {
      this.http.userDataWhoPost(data).subscribe(userData => {
        this.userDetails = userData
        this.http.deletePost(user.title).subscribe(res => {
        })
      })
    })
    this.router.navigate(['/dashboard/accept/'+user.username+'/'+this.name])
    this.arrayOfPost.splice(index, 1)
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
        this.router.navigate(['/'])
      }
    })
  }
  showProfile(){
    if(this.logoutAndProf){
      this.logoutAndProf = false
    }else{
      this.logoutAndProf = true
    }
  }
  decision(val){
    if(val == "Show Profile"){
      this.router.navigate(['/profile/'+this.name+'/'+this.name])
    }else{
      this.logout();
    }
  }
  showPostProfile(user){
    this.router.navigate(['/profile/'+user+'/'+this.name])
  }

}
