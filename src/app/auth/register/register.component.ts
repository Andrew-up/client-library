import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, NgForm} from "@angular/forms";
import {NotificationService} from "../../services/notification.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";
import {Token} from "../../models/Token";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  textOrPass ='password';
  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private router:Router,
              private tokenStorageService:TokenStorageService,
              private userService:UserService) {
    if(this.tokenStorageService.getUser()!=null){
      this.router.navigate(['/index'])
    }
  }
  message?: string;

  submitForm(form:NgForm){
    console.log(form);

    let o = {
      email: form.value.email,
      name:form.value.firstname,
      surname:form.value.surname,
      password: btoa(form.value.password),
    }
    if(form.value.password === form.value.confirmPassword){
    this.authService.register(o).subscribe({
      next: (value: User) => {
        this.message = JSON.stringify(value);
        this.notificationService.showSnackBar('Регистрация успешна');
        this.router.navigate(['/login']);
      },
      error: (e) => {
        this.message = JSON.stringify(e.error);
        console.log(e)
      }
    })
    }
    else {
      this.notificationService.showSnackBar('Пароли не совпадают');
    }
  }
  ngOnInit(): void {
  }
}
