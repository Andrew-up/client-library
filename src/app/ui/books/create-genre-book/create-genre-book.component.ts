import {Component, OnInit} from '@angular/core';
import {GenreService} from "../../../services/genre.service";
import {BookGenres} from "../../../models/BookGenres";

@Component({
  selector: 'app-create-genre-book',
  templateUrl: './create-genre-book.component.html',
  styleUrls: ['./create-genre-book.component.css', '../../common_styles.css']
})
export class CreateGenreBookComponent implements OnInit {

  constructor(private genreService: GenreService) {
  }

  genreName = '';
  response = '';

  ngOnInit(): void {
  }

  createGenre() {
    let obj: BookGenres = {
      genresName: this.genreName,
    }
    this.genreService.createGenre(obj).subscribe({
      next: (res: BookGenres) => {
        console.log(res);
        this.response = 'Ответ: ';
        // this.response = this.response+ res.genresName;
        if(this.genreName == res.genresName){
          this.response= this.response + res.genresName +'  успешно добавлен';
        }
      }
    })
  }

}
