import { Component, inject } from '@angular/core';
import { User } from '../../services/auth/user';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment.development';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent {

  errorMessage = '';
  user?: User;
  userLoginOn: boolean = false;
  editMode: boolean = false;

  // inject services
  private formBuilder = inject(FormBuilder);
  private userService = inject(UserService);
  private loginService = inject(LoginService);

  registerForm = this.formBuilder.group({
    id:[''],
    lastname:['',Validators.required],
    firstname:['', Validators.required],
    country:['',Validators.required]
  })


  constructor() {
    this.userService.getUser(environment.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.registerForm.controls['id'].setValue(user.id.toString());
        this.registerForm.controls['lastname'].setValue(user.lastname!);
        this.registerForm.controls['firstname'].setValue(user.firstname!);
        this.registerForm.controls['country'].setValue(user.country!);
      },
      error: (error) => this.errorMessage = error,
      complete() {
        console.info('User data loaded');
      },
    })

    this.loginService.isLoggedIn.subscribe({
      next: (isLoggedIn) => {
        this.userLoginOn = isLoggedIn;
      }
    })

  }

  get firstname()
  {
    return this.registerForm.controls.firstname;
  }

  get lastname()
  {
    return this.registerForm.controls.lastname;
  }

  get country()
  {
    return this.registerForm.controls.country;
  }

  savePersonalDetailsData()
  {
    if (this.registerForm.valid)
    {
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next:() => {
          this.editMode=false;
          this.user=this.registerForm.value as unknown as User;
        },
        error:(errorData)=> console.error(errorData)
      })
    }
  }

}
