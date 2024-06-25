import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  isUserLoggedIn: boolean = false;
  private loginService = inject(LoginService);

  ngOnInit(): void {
    this.loginService.isLoggedInData.subscribe({
      next: (isLoggedIn) => {
        this.isUserLoggedIn = isLoggedIn;
      }
    })
  }

  logout() {
    console.log("logging out");
    this.loginService.logout();
  }

}
