import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/User";
import {UpdatePageService} from "../../../services/update-page.service";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private userService: UserService,
              private updatePage: UpdatePageService) {
  }

  errorCount: number = 0;
  users: User[] = [{
    id: 0,
  }]

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
        next: (value) => {
          this.users = value;
          this.errorCount = 0;
        },
        error: (err) => {
          this.errorCount++;
          if (this.errorCount >= 5 && err.status == 401) {
            this.getAllUsers();
          }
        }
      }
    )
  }

  ngOnInit(): void {

    this.getAllUsers();
  }

}
