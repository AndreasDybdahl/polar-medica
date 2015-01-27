import {App} from 'app/app';
import {RouterShim} from './utils';

describe('the App module', () => {
  let sut;

  beforeEach(() => { sut = new App(new RouterShim()); });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the routers title', () => {
    expect(sut.router.title).toEqual('Application Title');
  });
});