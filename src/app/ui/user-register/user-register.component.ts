import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(public AUTHService: AuthService) { }

  ngOnInit() {
  }

}
