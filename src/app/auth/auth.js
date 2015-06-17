import {inject} from 'aurelia-framework';
import {SimpleClient} from 'http/http-client';
import {Redirect} from 'aurelia-router';

const LOCALSTORAGE_KEY = 'refreshToken';

function formEncode(obj) {
  return Object.keys(obj).map(key => {
    let val = obj[key];
    
    return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
  }).join('&');
}

export class AuthService {
  constructor() {
    this.token = null;
    this.user = null;
  }

  isAuthenticated() {
    if (this.user === null || this.token === null) {
      return false;
    }
    
    return true;
  }
  
  login(username, password) {
    return this.http.post('token', { 
        body: formEncode({ grant_type: 'password', username: username, password: password }),
        skipAuth: true
      }).then(this._handleTokenResponse.bind(this));
  }
  
  logout({ redirect = true } = { }) {
    console.log('Logging out');
    this.user = null;
    this.token = null;
    localStorage.setItem(LOCALSTORAGE_KEY, null);
    
    this.showNav(false);
    
    if(redirect) {
      window.location.hash = '#/login';
    }
  }
  
  attemptRelogin() {
    return new Promise(resolve => {
      let refreshToken = localStorage.getItem(LOCALSTORAGE_KEY);
      
      if (refreshToken === 'null' || refreshToken === null) {
        return resolve(false); 
      }
      
      resolve(this.http.post('token', {
        body: formEncode({ grant_type: 'refresh_token', refresh_token: refreshToken }),
        skipAuth: true
      })
      .then(this._handleTokenResponse.bind(this))
      .catch(() => {
        this.logout({ redirect: false }); 
      }));
    });
  }
  
  showNav(show) {
    this.router.navigation.forEach(route => {
      route.settings.isVisible = show;
    });
  }
  
  setRouter(router) {
    this.router = router;
  }
  
  _ensureNotExpired() {
    return new Promise(resolve => {
      if(!this.timeout) {
        resolve();
        return;
      }
      
      if(Date.now() >= this.timeout) {
        console.log('Session expired - Fetching new token');
        resolve(this.attemptRelogin()); 
      }
      else {
        resolve(); 
      }
    }); 
  }
  
  _fetchUser() {
    return this.http.get('api/account/me').then(response => response.json());
  }
  
  _handleTokenResponse(response) {
    return response.json()
      .then(content => {
        localStorage.setItem(LOCALSTORAGE_KEY, content.refresh_token);
        this.token = content.access_token;
        this.timeout = Date.now() + ((content.expires_in - 3) * 1000);
      })
      .then(this._fetchUser.bind(this))
      .then(user => {
        console.log('Fetched user: ', user);
        this.user = user;
      
        this.showNav(true);
      
        return user;
      })
      .catch(reject => {
        return false;
      }); 
  }
}

export class AuthorizeStep {
  static inject() { return [AuthService]; }
  constructor(authService) {
    this.auth = authService;
  }
  
  run(routingContext, next) {
    // Check if the route has an "auth" key
    // The reason for using `nextInstructions` is because
    // this includes child routes.
    console.log('Is routing');
    if (routingContext.nextInstructions.some(i => i.config.auth !== false)) {
      var isLoggedIn = this.auth.isAuthenticated();
      
      if (!isLoggedIn) {
        console.log('Am not logged in');
        return next.cancel(new Redirect('login'));
      }
    }
    else {
      
    }

    return next();
  }
}

@inject(AuthService)
export class HttpClient extends SimpleClient {
  static metadata() { return Metadata.transient(); }
  constructor(authService) {
    super();
    
    this.authService = authService;
  }
  
  send(uri, opts = {}) {
    if (!opts.headers) {
      opts.headers = {}; 
    }
    
    if(opts.body && typeof opts.body !== 'string') {
      opts.headers['Content-Type'] = 'application/json';
      opts.body = JSON.stringify(opts.body);
    }
    
    if(opts.skipAuth) {
      return super.send(uri, opts);
    }
    
    return this.authService._ensureNotExpired().then(() => { 
      if (!opts.skipAuth && uri.indexOf('api') !== -1 && this.authService.token !== null) {
        opts.headers['Authorization'] = `Bearer ${this.authService.token}`;
      }
      
      console.log('Sending request to', uri);
      return super.send(uri, opts);
    });
  }
}