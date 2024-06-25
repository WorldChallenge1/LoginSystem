import { Component, inject } from '@angular/core';
import { NavComponent } from '../../shared/nav/nav.component';
import { PersonalDetailsComponent } from '../../components/personal-details/personal-details.component';
import { LoginService } from '../../services/auth/login.service';
import { User } from '../../services/auth/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent, PersonalDetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isUserLoggedIn: boolean = false;
  private loginService = inject(LoginService);

  ngOnInit(): void {
    this.loginService.isLoggedInData.subscribe({
      next: (isLoggedIn) => {
        this.isUserLoggedIn = isLoggedIn;
      }
    })
  }

}
