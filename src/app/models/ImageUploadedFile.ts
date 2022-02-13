import {ImageUploadError} from "./ImageUploadError";

export interface ImageUploadedFile {
  file?:File;
  error?: ImageUploadError;
}
