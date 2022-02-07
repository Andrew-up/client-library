export interface Book {

  id?: string;
  authors?: string;
  bookTitle?: string;
  genreCode?: string;
  bookReleaseDate?: string;
  publisherId?: string;
  numberPages?: string;
  coverId?: string;
  bookSeries?: string;
  nameISBN?: string;
  ageLimitCode?: string;
  languageId?: string;
  translationId?: string;
  publisherName?: string;
  imageId?: string;

  //name
  genreName?: string;
  seriesName?:string;
  translationName?: string;
}
