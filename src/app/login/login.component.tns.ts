import { Component, OnInit } from '@angular/core';
import { EventData } from 'tns-core-modules/ui/page/page';
import { TextView } from '@nativescript/angular/forms/value-accessors';
// import { Info } from '../register/info';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.tns.html',
  styleUrls: ['./login.component.tns.css']
})

export class LoginComponent implements OnInit {

    username: String
    password: String
    
  constructor() {
  }

  ngOnInit() {
  }
  submit() {
      alert(this.username + " " + this.password)
  }

  
  onTextChange(args: EventData) {
    const tv = args.object as TextView;
    this.username = tv.text;
  }
  passwordInput(args: EventData) {
    const tv = args.object as TextView;
    this.password = tv.text;
  }
}
