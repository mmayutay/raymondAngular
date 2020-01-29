import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public arrayData: any
  public arrayPost: any
  public sub: any
  public name: String
  public from: String

  constructor(
    private http: RequestService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(names => {
      this.from = names.name
      this.name = names.from
    })
    this.http.userDataWhoPost(this.from).subscribe(data => {
      this.arrayData = data
    })
    
  }
  onclickHome(){
    this.router.navigate(['/home/'+this.name])
  }


}
