import { Component, OnInit } from '@angular/core';
import { Info } from '../register/info';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public inf: Info;
  public listOfInfo: Array<Info>;

  constructor(
    private http: RequestService,
    private router: Router
    ) { 
    this.inf = new Info();
    this.listOfInfo = new Array<Info>();
  }

  ngOnInit() {
  }

  onSubmit(fillup){
    this.http.addUser(this.inf).subscribe(data => {
      console.log(data)
    });
    this.router.navigate(['/'])
    fillup.form.reset();
  }

}
