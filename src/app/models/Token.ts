import {RefreshToken} from "./RefreshToken";

export interface Token {
  accessToken?: string;
  refreshToken?: RefreshToken;
  success?: boolean;
  role?:string;
}
