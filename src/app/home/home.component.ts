import { Component, OnInit } from "@angular/core";
import { RequestService } from '../request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
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
    
  }
  showDetails(value) {
    this.router.navigate(['/postdetails/'+value.username])

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
        this.http.deletePost(user.username).subscribe(res => {
        })
      })
    })
    this.router.navigate(['/dashboard/accept/'+user.username+'/'+this.name])
    this.arrayOfPost.splice(index, 1)
  }

}
