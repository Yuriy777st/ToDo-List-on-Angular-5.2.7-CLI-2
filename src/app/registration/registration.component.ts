import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService} from '../authentication-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    user: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
    }

    save() {
        this.loading = true;
        if (this.user.confirmPassword === this.user.password) {
            this.authenticationService.registration(this.user.username, this.user.password)
                .subscribe(result => {
                    if (result === true) {
                        this.router.navigate(['/']);
                    } else {
                        this.loading = false;
                    }
                });
        } else {
          this.error = 'Passwords do not match!!!';
        }

    }

}
