import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FirebaseUserModel } from '../../model/firebase-user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-page-user',
  templateUrl: 'user.component.html',
  styleUrls: ['user.scss'],
})
export class UserComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthenticationService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe((routeData) => {
      const data = routeData['data'];
      if (data) {
        this.user = data;
        this.profileForm.patchValue({ name: this.user.name });
      }
    });
  }

  save(value: {}): void {
    // this.userService.updateCurrentUser(value).then(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => console.log(err)
    // );
  }

  logout(): void {
    this.authService.doLogout().then(
      (res) => {
        this.location.back();
      },
      (error) => {
        console.log('Logout error', error);
      }
    );
  }
}
