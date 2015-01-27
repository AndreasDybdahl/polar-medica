export class RouterStub {
  configure(handler) {
    this.routes = [];
    handler(this);
  }

  map(routes) {
    this.routes = this.routes.concat(routes);
  }
}