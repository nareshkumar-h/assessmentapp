import { InjectionToken } from '@angular/core';

export class Config {
  API_ENDPOINT?: string;
  ORG_ID?:string;  
  USER_TYPE?:string;
  ENCRYPTION?:boolean = false;
}

export const AUTH_CONFIG = new InjectionToken<Config>('AUTH_CONFIG');