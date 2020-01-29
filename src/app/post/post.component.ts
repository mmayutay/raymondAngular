import { Component, OnInit } from '@angular/core';
import { Posts } from './model';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public values = new Posts
  public name: String
  public sub: any
  public posts: any
  public dataFromDatabase: any

  constructor(private router: Router, private route: ActivatedRoute, private http: RequestService) { }

  ngOnInit() {
    this.posts = new Posts
    this.sub = this.route.params.subscribe(params => {
      this.name = params.name
    })
    this.http.userDataWhoPost(this.name).subscribe(data => {
      console.log(data)
      this.dataFromDatabase = data
    })
  }

  onSubmit(){
    console.log(this.dataFromDatabase)
    this.values.username = this.dataFromDatabase[0].username
    this.values.address = this.dataFromDatabase[0].address
    this.values.age = this.dataFromDatabase[0].age
    this.http.addPosts(this.values).subscribe(data => {
      this.router.navigate(['/home/'+this.values.username])
    })
  }

}
