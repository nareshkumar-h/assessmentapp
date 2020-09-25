import { InjectionToken } from '@angular/core';

export interface Config {
  API_ENDPOINT?: string;
  ORG_ID?:string;
  USER_TYPE?:string;
}

export const COURSE_CONFIG = new InjectionToken<Config>('COURSE_CONFIG');