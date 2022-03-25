export interface Book {

  bookId?: number;
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
  priceId?:string;

  //name
  genreName?: string;
  seriesName?:string;
  translationName?: string;
  authorsName?:string;
  authorsFullName?:string;
  languageName?:string;
  coverName?:string;
  ageLimitName?:string;
  priceName?:string;

  //Image
  imageBlob?:Blob;

  test?:string;

  imageSrcTemp?:any;

  giveOut?:boolean;
  basketId?:string;

  myBooksRent?:boolean;
  dateRent?:string;
  myBooksRequest?:boolean;
  myBooksBasket?:boolean;

}
