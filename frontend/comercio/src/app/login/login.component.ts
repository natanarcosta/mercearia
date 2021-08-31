import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService) {}
  userForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  isLoggedIn = false;
  errorMessage!: string;
  sub!: Subscription;

  ngOnInit(): void {
    this.sub = this.userService.errorSubject.subscribe((error: string) => {
      this.errorMessage = error;
    });
  }

  onSubmit() {
    console.log(this.userForm);
    const newUser = new User(
      this.userForm.value['username'],
      this.userForm.value['password'],
      false
    );
    console.log(newUser);
    this.userService.createUser(newUser);
  }
}
