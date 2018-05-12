import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Observer, Subject } from 'rxjs/Rx';
import { ToasterService } from 'angular2-toaster';

import { LocalStorageHelper } from '../helpers/index';
import { SessionService } from './session.service';

import { environment } from '../../../environments/environment';

import * as _ from 'lodash';
import * as moment from 'moment';

interface LoginResponse {
  sessionId: string;
}

/**
 * This class provides the UserService service.
 */
@Injectable()
export class UserService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private hardLogout: boolean = false;

  // TODO: Change this to false once login service is wired in
  public isLoggedIn: boolean = false;
  public sessionId: string;

  loginStateChange: Subject<boolean> = new Subject<boolean>();

  /**
   * Creates a new UserService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(
      protected router: Router,
      protected sessionService: SessionService,
      protected localStorageHelper: LocalStorageHelper,
      private http: Http,
      protected toasterService: ToasterService
    ) {
    let loggedIn = <string>localStorageHelper.get('user.loggedIn');
    let sessionId = <string>localStorageHelper.get('user.sessionId');

    // TODO: Comment this out once login service wired in
    // this.isLoggedIn = loggedIn === 'true' ? true : false;
    this.sessionService.setSessionId(sessionId);

    sessionService.sessionStateChange.subscribe((val) => {
      console.log('Session state change', val);
      if (!val) {
        this.postLogout();
      }
    })
  }

  public getSessionId(): string {
    return this.sessionService.getSessionId();
  }

  public logIn(agentId: string, password: string, success: () => void, error: () => void): Observable<LoginResponse> {
    let o: Observable<LoginResponse> = this.loginUser(agentId, password);
    o.subscribe(
      (loginResponse: LoginResponse) => {
        if(loginResponse != null) {
          this.sessionService.setSessionId(loginResponse.sessionId);
          this.isLoggedIn = true;

          this.localStorageHelper.set('user.loggedIn', true);
          this.localStorageHelper.set('user.sessionId', loginResponse.sessionId);

          this.loginStateChange.next(this.isLoggedIn);
          this.sessionService.establishSession();
          this.postLogin();

          if (success) {
            success();
          }

          this.router.navigate(['/']);
        } else {
          this.toasterService.pop('error', 'Invalid login credentials');
          error();
        }
      },
      (err) => {
        this.toasterService.pop('error', 'Invalid login credentials');
        error();
      }
    );

    return o;
  }

  public logOut() {
    this.logoutUser();
    this.postLogout();
  }

  postLogin() {

  }

  postLogout() {
    this.localStorageHelper.remove('user.loggedIn');
    this.localStorageHelper.remove('user.sessionId');

    this.sessionService.setSessionId(null);
    this.isLoggedIn = false;

    this.loginStateChange.next(this.isLoggedIn);

    if (this.hardLogout) {
      window.location.reload();
    } else {
      this.router.navigate(['/login']);
    }
  }

  /* Service calls */
  refreshSession() {
    if (!this.isLoggedIn)
      return null;

    return this.http.get('http://localhost:9000/user/refreshSession')
      .map((res: Response) => res.json())
      .catch(this.handleError)
      .subscribe();
  }

  loginUser(username: string, password: string) {
    // NOTE: Fake login
    return Observable.of({sessionId: 'dummy'});

    // let body = JSON.stringify({username: username, password: password});

    // return this.http.post(environment.API + 'user/login', body, {headers: this.headers})
    //   .map((res: Response) => res.json())
    //   .catch(this.handleError);
  }

  logoutUser() {
    return Observable.of(true);

    // return this.http.post(environment.API + 'user/logout/', null, {headers: this.headers})
    //   .map((res: Response) => res.json())
    //   .catch(this.handleError)
    //   .subscribe();
  }

  /**
    * Handle HTTP error
    */
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    return Observable.throw(errMsg);
  }
}
