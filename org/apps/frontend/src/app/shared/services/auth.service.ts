import { Injectable } from '@angular/core';
import { AuthResult, Employee, User, UserType } from '../models/user';
import { Observable, map, switchMap, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'app-auth-token';
  private userKey = 'app-user-info';

  private url = 'http://localhost:3000';

  private urlConfig = {
    login: 'login',
    register: 'register',
  };

  public login(email: string, password: string) {
    return this.http
      .post<AuthResult>(this.urlConfig.login, { email, password })
      .pipe(
        tap((c) => {
          this.setToken(c.accessToken);
          this.setUserInfo(c.user);
        })
      );
  }

  public updateUser(user: Employee) {
    return this.http.patch<User>(`${this.url}/users/${user.id}`, user);
  }

  public register(user: User) {
    if (user.userType === UserType.Admin) {
      return this.checkAdminExists().pipe(
        switchMap((adminExists) => {
          if (!adminExists) {
            return this.http.post(this.urlConfig.register, user);
          } else {
            return throwError(() => new Error('Admin user already exists'));
          }
        })
      );
    } else {
      return this.http.post(this.urlConfig.register, user);
    }
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  public getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  public setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  public setUserInfo(user: User) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  public getUserInfo() {
    return localStorage.getItem(this.userKey) != null
      ? JSON.parse(localStorage.getItem(this.userKey)!)
      : null;
  }

  public isUserSignedIn() {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    let key: keyof typeof this.urlConfig;

    for (key in this.urlConfig) {
      this.urlConfig[key] = this.url + '/' + this.urlConfig[key];
    }
  }

  public checkAdminExists(): Observable<boolean> {
    return this.http
      .get<User[]>(this.urlConfig.register)
      .pipe(
        map(
          (users) =>
            !!users.find(
              (user) =>
                user.userType === UserType.Admin &&
                user.email === 'admin@gmail.com' &&
                user.firstName === 'admin' &&
                user.lastName === 'admin' &&
                user.password === 'admin'
            )
        )
      );
  }
}
