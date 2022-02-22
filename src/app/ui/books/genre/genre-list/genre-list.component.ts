import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {RentBook} from "../../../../models/RentBook";
import {BookGenres} from "../../../../models/BookGenres";
import {GenreService} from "../../../../services/genre.service";
import {NotificationService} from "../../../../services/notification.service";

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  constructor(private genreService: GenreService,
              private toast: NotificationService) {
  }

  genre: BookGenres[] = [{}]
  updateGenre: BookGenres = {}
  enableEditIndex = null;
  enableEdit = false;
  errorCount = 5;
  genreName = '';
  response = '';
  help = false;
  errorDataBase = false;

  getAllGenre() {
    this.genreService.getAllGenres().subscribe({
      next: (value) => {
        this.genre = value;
        this.errorCount = 5;
      },
      error: (error) => {
        if (error.status == 401 && this.errorCount != 0) {
          this.errorCount--;
          this.getAllGenre();
          console.log(this.errorCount);
        }
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
        this.errorCount = 5;
        if(value.bookGenresId==-2000){
          this.errorDataBase = false;
          this.errorDataBase = true;
          this.response ='Ответ: '+ value.genresName;
        }
      },
      error: (err) => {
        if (err.status == 401 && this.errorCount != 0) {
          this.errorCount--;
          this.saveEditGenre(id);
          console.log(this.errorCount);
        }
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
        this.errorCount = 5;
        this.toast.showSnackBar(value.message);
      },
      error: (error) => {
        if (error.status == 401 && this.errorCount != 0) {
          this.errorCount--;
          this.deleteGenre(id);
          console.log(this.errorCount);
        }
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
        if (err.status == 401 && this.errorCount != 0) {
          this.errorCount--;
          this.addGenre();
          console.log(this.errorCount);
        }
      }

    })
  }

  ngOnInit(): void {
    this.getAllGenre();

  }


}
