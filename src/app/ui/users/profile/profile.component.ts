import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/User";
import {ImageService} from "../../../services/image.service";
import {NotificationService} from "../../../services/notification.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService,
              private imageUploadService: ImageService,
              private novificationService: NotificationService,
              private token: TokenStorageService) {
  }

  myProfile: User = {bookRental: [],phone:'0000000000'}
  updateProfile: User = {bookRental: []}
  editProfileBool = false;
  selectedFile: any = null;
  getProfile = false;
  url: any;


  editProfile() {
    this.editProfileBool = !this.editProfileBool;
  }


  getMyProfile() {
    this.userService.getCurrentUser().subscribe({
      next: (v: User) => {
        this.myProfile = v;
        this.getImageProfile();

        console.log(v);
      },
      error: (err) => {

      }
    });
  }

  saveUser() {
    this.userService.updateUser(this.updateProfile).subscribe({
      next: (value) => {
        this.getMyProfile();
        this.editProfileBool = false;
        this.token.saveUser(value);
      },
      error: (err) => {

      }
    })
  }

  onFileSelected(event) {
    let listError: Array<String> = [];
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    console.log(this.selectedFile.type)
    if (!this.selectedFile.name.match("\\.(jpg|jpeg|png|gif)$")) {
      listError.push("Неверный формат")
    }
    if (this.selectedFile.size > 1000000) {
      console.log("Размер слишком большой")
      listError.push("Размер слишком большой")
    }
    console.log(listError);
    if (listError.length == 0) {
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.onerror = (event: any) => {
        console.log("File could not be read: " + event.target.error.code);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.novificationService.showSnackBar(listError.toString())
      this.url = null;
    }
    console.log(this.selectedFile);
  }

  cancel() {
    this.editProfileBool = !this.editProfileBool;
    delete this.updateProfile.firstname;
    delete this.updateProfile.lastname;
    delete this.updateProfile.address;
    delete this.updateProfile.phone;
    delete this.updateProfile.dateOfBirth;
    delete this.updateProfile.info;
  }

  ngOnInit(): void {
    this.getMyProfile();
  }

  imageProfile: any;

  onUpload() {
    const fd = new FormData();
    // https://developer.mozilla.org/ru/docs/Web/API/FormData/append
    fd.append('image', this.selectedFile, this.selectedFile.name);
    console.log(this.selectedFile)
    this.imageUploadService.uploadImgToProfile(this.selectedFile).subscribe({
      next: (value) => {
        this.getImageProfile();
        console.log(value)
        this.selectedFile = null;

      },
      error: (err) => {
      },
      complete: () => {
        console.log('complete')
      }
    })

  }

  getImageProfile() {
    this.getProfile = false;
    this.imageUploadService.getProfileImg().subscribe({
      next: (value) => {
        this.myProfile.imageProfile = value;
        const reader = new FileReader();
        reader.readAsDataURL(value);
        reader.addEventListener("load", () => {
          this.myProfile.imageProfile = reader.result;
          this.getProfile = true;
        })
        console.log(value)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
