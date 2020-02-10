import { Component, OnInit } from '@angular/core';
import { Info } from '../register/info';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.tns.html',
    styleUrls: ['./register.component.tns.css']
})
export class RegisterComponent implements OnInit {
    public inf: Info;
    public listOfInfo: Array<Info>;

    constructor() {
        this.inf = new Info()
    }

    ngOnInit() {
    }

    onSubmit() {
        console.log(this.inf)
    }

}
