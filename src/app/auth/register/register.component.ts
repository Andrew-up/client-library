import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder} from "@angular/forms";
import {NotificationService} from "../../services/notification.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService,
              private notificationService: NotificationService,) {
  }
  email = '';
  name = '';
  surname = '';
  password = '';
  message?: string;

  apiRegister(email: string, name: string, surname: string, password: string): any {
    let o = {
      email: '',
      name: '',
      surname: '',
      password: ''
    }
    o.email = email;
    o.name = name;
    o.surname = surname;
    o.password = password;

    this.authService.register(o).subscribe({
      next: (value: User) => {
        this.message = JSON.stringify(value);
        this.notificationService.showSnackBar('Регистрация успешна');
      },
      error: (e) => {
        this.message = JSON.stringify(e.error);
        console.log(e)
      }
    })
  }
  ngOnInit(): void {
  }
}
