import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus } from '../enums/auth-status.enum';
import { LoginResponse } from '../interfaces';

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

  login( email: string, password: string): Observable<boolean>{
    const url = `${ this.baseUrl }/User/Login`;
    const body = {email, password };

    return this.http.post<LoginResponse>(url, body)
      .pipe(
        tap( ({ token }) => {
          this._currentUser.set(  email );
          this._authStatus.set( AuthStatus.authenticated );
          localStorage.setItem('token', token!);
          console.log(email, token );
        }),
        map( ()  => true),

        catchError( err => {
          return throwError( () => err.error.message);
        })
      );
  }
}
