import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';
const { usersUrl } = environment;

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  errorSubject = new Subject<string>();

  createUser(newUser: User) {
    console.log('Creating ' + newUser);
    this.http.post(usersUrl, newUser).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        this.errorSubject.next(error.error.message);
      }
    );
  }

  login(user: User) {}

  logout(user: User) {}
}
