import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs/Rx';

/**
 * This class provides the SessionService service to handle user sessions.
 */
@Injectable()
export class SessionService {
  sessionStateChange: Subject<boolean> = new Subject<boolean>();
  private sessionId: string;

  /**
   * Creates a new SessionService.
   *
   * @constructor
   */
  constructor() {
    
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  public establishSession() {
    this.sessionStateChange.next(true);
  }

  public terminateSession() {
    if (this.sessionId != null) {
      this.sessionId = null;
      this.sessionStateChange.next(false);
    }
  }
}