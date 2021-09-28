import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppSettings, defaultSettings } from '../model/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private options = defaultSettings;

  get notify(): Observable<any> {
    return this.notify$.asObservable();
  }

  private notify$ = new BehaviorSubject<any>({});

  setOptions(options: AppSettings) {
    this.options = Object.assign(defaultSettings, options);
    this.notify$.next(this.options);
  }

  getOptions(): AppSettings {
    return this.options;
  }

  /** System language */

  get language() {
    return this.options.language;
  }

  setLanguage(lang: string) {
    this.options.language = lang;
    this.notify$.next({ lang });
  }
}
