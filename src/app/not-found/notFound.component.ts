import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '@app/_services';
import {Router} from "@angular/router";

@Component({ templateUrl: 'notFound.component.html' })
export class NotFoundComponent implements OnInit {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      const url =  currentUser.role === 'Admin' ? '/admin' : '/user';
      this.router.navigate([url]);
    } else {
      this.router.navigate(['/']);
    }

  }
}


