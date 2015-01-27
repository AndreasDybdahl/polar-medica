import {App} from 'app/app';
import {RouterStub} from './utils';

describe('the App module', () => {
  let sut;

  beforeEach(() => { sut = new App(new RouterStub()); });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the routers title', () => {
    expect(sut.router.title).toEqual('Application Title');
  });
});