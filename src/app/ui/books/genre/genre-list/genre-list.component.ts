import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RentBook} from "../../../../models/RentBook";
import {BookGenres} from "../../../../models/BookGenres";
import {GenreService} from "../../../../services/genre.service";
import {NotificationService} from "../../../../services/notification.service";
import {TokenStorageService} from "../../../../services/token-storage.service";

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  constructor(private genreService: GenreService,
              private toast: NotificationService,
              private tokenService:TokenStorageService) {
  }

  genre: BookGenres[] = [{}]
  updateGenre: BookGenres = {}
  enableEditIndex = null;
  enableEdit = false;

  genreName = '';
  response = '';
  help = false;
  errorDataBase = false;

  getAllGenre() {
    this.genreService.getAllGenres().subscribe({
      next: (value) => {
        this.genre = value;
        console.log(123)
      },
      error: (error) => {
        console.log(100000000000000)
      }
    })
  }

  enableEditMethod(e, i) {
    this.enableEdit = !this.enableEdit;
    this.enableEditIndex = i;
    this.updateGenre.genresName = '';
    console.log(i);
  }

  cancel() {
    this.enableEditIndex = null;
    this.enableEdit = false;
  }

  saveEditGenre(id) {
    this.updateGenre.bookGenresId = id;
    console.log(this.updateGenre);
    this.genreService.updateGenre(this.updateGenre).subscribe({
      next: (value) => {
        this.getAllGenre();
        this.enableEditIndex = null;
        this.enableEdit = false;
        console.log(value)

        if(value.bookGenresId==-2000){
          this.errorDataBase = false;
          this.errorDataBase = true;
          this.response ='Ответ: '+ value.genresName;
        }
      },
      error: (err) => {

      }
    })
  }

  idGenre?: number;

  idClickGenre(id?: number) {
    this.idGenre = id;
  }

  deleteGenre(id?: number) {
    this.genreService.deleteGenre(id).subscribe({
      next: (value) => {
        console.log('v: ' + value)
        this.getAllGenre();

        this.toast.showSnackBar(value.message);
      },
      error: (error) => {

      }
    })
    console.log('id:' + id);
  }


  addGenre() {
    let obj: BookGenres = {
      genresName: this.genreName,
    }
    this.genreService.createGenre(obj).subscribe({
      next: (res: BookGenres) => {
        console.log(res);
        if (this.genreName == res.genresName) {
          this.response = this.response + res.genresName + '  Успешно добавлен';
          this.getAllGenre();
          this.genreName = '';
          this.help = false;
        }
        else {
          this.help = true;
          console.log("jhuhhh")
          this.errorDataBase = false;
          this.response ='Ответ: '+ res.genresName;
        }
        if(res.bookGenresId==-2000){
          this.errorDataBase = true;
          this.response ='Ответ: '+ res.genresName;
        }
      },
      error: (err) => {

      }

    })
  }

  ngOnInit(): void {
    this.getAllGenre();

  }


}
