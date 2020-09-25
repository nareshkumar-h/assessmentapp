import { InjectionToken } from '@angular/core';

export interface Config {
  API_ENDPOINT?: string;
}

export const API_URL = new InjectionToken<Config>('API_URL');