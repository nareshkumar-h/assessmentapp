import { InjectionToken } from '@angular/core';

export class Config {
    SECURE_KEY?: string="12345";
    ENCODING_TYPE?:string = "des";
    ENCRYPTION?:boolean =false;
  }
  
  export const SECURE_CONFIG = new InjectionToken<Config>('SECURE_CONFIG');