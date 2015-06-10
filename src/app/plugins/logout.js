export function install(aurelia) {
  let container = aurelia.container;
  let auth = new AuthService();
    
  container.registerInstance(AuthService, auth);
  auth.http = container.get(HttpClient);
  
  auth.attemptRelogin().then(() => {
    return aurelia.start().then(a => a.setRoot('app/app', document.body));
  });
  
  document.addEventListener('logout', e => {
    if(!e.defaultPrevented) {
      router.navigate('/');
    }
  });
}