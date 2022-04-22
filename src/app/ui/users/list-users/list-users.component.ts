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

  isDataLoaded = false;

  users: User[] = [{
    id: 0,
    bookRental: [],
  }]
  roles: any;
  status: any;
  selectedRole:any;

  saveUser(item:User) {
      this.userService.updateRoleUserOrStatus(item).subscribe({
        next:(value)=>{
          console.log(value);
        },
        complete:()=>{
          this.getAllUsers();
        }
      })
  }
  saveRole(item) {
    console.log(item);
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
        next: (value) => {
          this.users = value;
        },
        error: (err) => {
        },
      complete:()=>{

        this.getUserRoles();
      }
      }
    )
  }

  getUserRoles() {
    this.userService.getUserRoles().subscribe({
      next: (value) => {
        this.roles =value;
      },
      complete:()=>{
        this.getUserStatus();

      }
    })
  }
  getUserStatus() {
    this.userService.getUsersStatus().subscribe({
      next: (value) => {
        this.status =value;
      },
      complete:()=>{
        this.isDataLoaded = true;
      }
    })
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

}
