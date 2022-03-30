import { User } from 'interfaces';
import { LocalStorageService } from 'services';

class AuthLocalStorage extends LocalStorageService {
  private static instance: AuthLocalStorage;

  accessToken: string = '';
  user?: User;

  public static sharedInstance(): AuthLocalStorage {
    if (!AuthLocalStorage.instance) {
      AuthLocalStorage.instance = new AuthLocalStorage();
    }

    return AuthLocalStorage.instance;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    this.save();
  }

  setUser(user?: User) {
    this.user = user;
    this.save();
  }

  load() {
    super.load();
  }
}

export const authLocalStorage = AuthLocalStorage.sharedInstance();
