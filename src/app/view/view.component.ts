import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public array: any
  public name: String
  private sub: any

  constructor(private router: Router, private route: ActivatedRoute, private http: RequestService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.name = params.name
      this.http.showPostByAddress(this.name).subscribe(data => {
        console.log(data)
        this.array = data
      })
    })
    
  }
  backToHome(){
    this.router.navigate(['/home/'+this.name])
  }

}
