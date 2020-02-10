import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit { 
  public userDetails: any
  public name: String
  public sub: any
  public newName: any

  constructor(private http: RequestService, private route: Router, private router: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.router.params.subscribe(params => {
      this.name = params.name
    })
    this.http.userDataWhoPost(this.name).subscribe(data => {
      this.userDetails = data
    })
  }
  submit(){
    this.http.updateProfile(this.userDetails, this.name).subscribe(data => {
      this.route.navigate(['/home/'+data])
    })
  }

}
