export class User{
  private username: string;
  private password: string;
  private admin: boolean;

  constructor(username: string, password: string, admin: boolean){
    this.username = username;
    this.password = password;
    this.admin = admin;
  }
}
