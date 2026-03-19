import { UserInfo } from '../user/user.info';

export interface LoginResult {
  accessCookie: string | null; 
  refreshCookie: string | null;
  userInfoDto: UserInfo;      
  expiresIn: number;
}