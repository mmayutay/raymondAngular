import { Component, OnInit } from '@angular/core';
import { Info } from '../register/info';
import { RequestService } from '../request.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public details: any
  public inf: Info;
  public listOfInfo: Array<Info>;

  constructor(private http: RequestService, private router: Router) {
    this.inf = new Info();
    this.listOfInfo = new Array<Info>();
  }

  ngOnInit() {
  }
  submit() {
    if (this.inf.username == "admin" && this.inf.password == "admin") {
      this.router.navigate(['/admin'])
    } else {
      this.http.getUserData(this.inf).subscribe(data => {
        console.log(data)
        if (data == null) {
          Swal.fire("Error", "You can't Log-in because you've entered a wrong credentials", "error")
        } else {
          this.router.navigate(['/home/' + this.inf.username])
        }
      })
    }
  }

}
