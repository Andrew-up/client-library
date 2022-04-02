import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/User";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private userService: UserService) {
  }


  users: User[] = [{
    id: 0,
    bookRental:[]
  }]

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
        next: (value) => {
          this.users = value;
        },
        error: (err) => {

        }
      }
    )
  }

  ngOnInit(): void {

    this.getAllUsers();
  }

}
