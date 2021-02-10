import { Injectable, Inject } from '@angular/core';
import * as SecureLS from 'secure-ls';
import { Config, SECURE_CONFIG } from './config';
import { PermissionsService } from './permissions.service';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  ls: any;
  encryption: boolean = false;
  constructor(
    @Inject(SECURE_CONFIG) private config: Config,
    private roleService: RoleService
  ) {
    this.encryption = config.ENCRYPTION;
    //    console.log(this.encryption);
    if (this.encryption) {
      this.ls = new SecureLS({
        encodingType: this.config.ENCODING_TYPE,
        isCompression: false,
        encryptionSecret: this.config.SECURE_KEY,
      });
    }
  }

  setEncryption(enable) {
    this.encryption = enable;
    if (enable) {
      this.ls = new SecureLS({
        encodingType: this.config.ENCODING_TYPE,
        isCompression: false,
        encryptionSecret: this.config.SECURE_KEY,
      });
    }
  }

  set(key, value) {
    if (this.encryption) {
      this.ls.set(key, value);
    } else {
      sessionStorage.setItem(key, value);
    }
  }

  get(key) {
    return this.encryption ? this.ls.get(key) : sessionStorage.getItem(key);
  }

  getLoggedInUser() {
    var user = this.get('LOGGED_IN_USER');
    return user ? JSON.parse(user) : null;
  }

  storeLoggedInUser(user) {
    this.set('LOGGED_IN_USER', JSON.stringify(user));
  }

  storeUser(key, value) {
    this.set(key, value);
  }

  clear() {
    localStorage.clear();
    sessionStorage.clear();
  }

  isAuthenticated() {
    let user = this.getLoggedInUser();
    let authenticated = false;
    if (user) {
      authenticated = true;
    }
    return authenticated;
  }

  hasRole(roles) {
    let user = this.getLoggedInUser();
    let allowed = false;
    if (user) {
      allowed = this.roleService.hasRole(user.roles, roles);
    }
    return allowed;
  }
}
