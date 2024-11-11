import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus } from '../enums/auth-status.enum';
import { LoginResponse, User } from '../interfaces';
import { ApplicationUser } from '../interfaces/applicationUser.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.apiUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<string |null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() )

  constructor() { }

  login( user: User ): Observable<boolean>{
    const url = `${ this.baseUrl }/User/Login`;

    return this.http.post<LoginResponse>(url, user)
      .pipe(
        tap( ({ userName, token }) => {
          this._currentUser.set(  userName );
          this._authStatus.set( AuthStatus.authenticated );
          localStorage.setItem('token', token!);
        }),
        map( ()  => true),

        catchError( err => {
          return throwError( () => err.error.message);
        })
      );
  }

  register( appUser: ApplicationUser ){
    const url = `${ this.baseUrl }/User/Register`;

    return this.http.post<boolean>(url, appUser)
      .pipe(
        map( ()  => true),

        catchError(err => {
        return throwError( () => console.log(err))
      })
    );
  }
}
