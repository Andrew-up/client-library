import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder} from "@angular/forms";
import {NotificationService} from "../../services/notification.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService,
              private notificationService: NotificationService,
              private router:Router) {
  }
  message?: string;

  obj:User={
  }

  apiRegister(): any {
    this.obj.password = btoa(this.obj.password+'');
    this.authService.register(this.obj).subscribe({
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
  ngOnInit(): void {
  }
}
