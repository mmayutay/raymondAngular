import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import Swal from 'sweetalert2';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  public array: any

  constructor(private http: RequestService) { }

  ngOnInit() {
    this.http.showAllUsers().subscribe(users => {
      console.log(users)
      this.array = users
    })
  }
  deleteUser(name, i){
    this.http.deleteUser(name).subscribe(data => {
      console.log(data)
    })
    this.array.splice(i, 1)
    Swal.fire("Nice!!", name + " was successfully deleted to the list!", "success")
  }

}
